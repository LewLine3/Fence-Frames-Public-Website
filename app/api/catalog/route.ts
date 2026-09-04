import { NextResponse } from 'next/server';
import { supabaseQuery } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export interface ComponentWithPricing {
  id: string;
  sku: string;
  category: string;
  display_name: string;
  description_body?: string;
  unit_of_measure: string;
  qty_basis?: string;
  qty_rate?: number;
  big_box_primary?: string;
  big_box_sku?: string;
  heritage_pilot?: boolean;
  active: boolean;
  pricing: Record<string, number>;
  cheapestPrice: number;
  cheapestVendor: string;
  highestPrice: number;
  vendorCount: number;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const sku = searchParams.get('sku');
    const heritageOnly = searchParams.get('heritage_only') === 'true';

    // Build PostgREST query string
    const filters: string[] = ['active=eq.true'];
    if (category) {
      filters.push(`category=eq.${category}`);
    }
    if (sku) {
      filters.push(`sku=eq.${sku}`);
    }
    if (heritageOnly) {
      filters.push('heritage_pilot=eq.true');
    }

    const queryString = `select=*,component_vendor_pricing(*)&${filters.join('&')}&order=category.asc,sku.asc`;

    const rawComponents = await supabaseQuery<any>('component_encyclopedia', queryString);

    const components: ComponentWithPricing[] = (rawComponents || []).map((c: any) => {
      const pricingMap: Record<string, number> = {};
      const vendorList: { vendor: string; price: number }[] = [];

      for (const p of c.component_vendor_pricing || []) {
        if (p.vendor && p.price_usd != null) {
          const price = Number(p.price_usd);
          pricingMap[p.vendor] = price;
          vendorList.push({ vendor: p.vendor, price });
        }
      }

      vendorList.sort((a, b) => a.price - b.price);
      const cheapest = vendorList[0] || { vendor: 'homeDepot', price: 0 };
      const highest = vendorList[vendorList.length - 1] || { vendor: 'homeDepot', price: 0 };

      return {
        id: c.id,
        sku: c.sku,
        category: c.category,
        display_name: c.display_name,
        description_body: c.description_body,
        unit_of_measure: c.unit_of_measure,
        qty_basis: c.qty_basis,
        qty_rate: Number(c.qty_rate || 1),
        big_box_primary: c.big_box_primary,
        big_box_sku: c.big_box_sku,
        heritage_pilot: c.heritage_pilot,
        active: c.active,
        pricing: pricingMap,
        cheapestPrice: cheapest.price,
        cheapestVendor: cheapest.vendor,
        highestPrice: highest.price,
        vendorCount: vendorList.length,
      };
    });

    return NextResponse.json({
      success: true,
      count: components.length,
      vendors: ['homeDepot', 'lowes', 'dunnLumber', 'chinook'],
      components,
    });
  } catch (err: any) {
    console.error('[API /api/catalog] error:', err);
    return NextResponse.json({ error: err.message || 'Error fetching catalog' }, { status: 500 });
  }
}
