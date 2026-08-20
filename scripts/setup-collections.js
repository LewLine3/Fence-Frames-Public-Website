const fs = require('fs');
const path = require('path');
const { createClient, ApiKeyStrategy } = require('@wix/sdk');
const { items } = require('@wix/data');

// Load API Key & Site ID dynamically from mcp_config.json
const mcpConfigPath = 'C:\\Users\\TwoLe\\.gemini\\config\\mcp_config.json';
const mcpConfig = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));

const API_KEY = mcpConfig.mcpServers.wix.env.WIX_API_KEY;
const SITE_ID = mcpConfig.mcpServers.wix.env.WIX_SITE_ID;

console.log(`Loaded credentials for Site ID: ${SITE_ID}`);

const wixClient = createClient({
  modules: { items },
  auth: ApiKeyStrategy({ apiKey: API_KEY, siteId: SITE_ID })
});

// Exact committed taxonomy from FenceBook/docs/configurator-type-style-catalog.md
const FENCE_STYLES_COMMITTED = [
  // --- Live Selectable Options ---
  {
    _id: 'style-vpf-natural-wood',
    title: 'Cedar Picket (Vertical)',
    slug: 'cedar-picket-vertical',
    styleId: 'vpf-natural-wood',
    code: 'WOOD',
    typeCategory: 'Vertical Fence',
    status: 'LIVE',
    templates: ['Base', 'Default', 'Lineage', 'Legacy', 'Heritage'],
    shortDescription: 'Classic Western Red Cedar vertical picket fence with Lineage, Legacy & Heritage trim options.',
    sortOrder: 1
  },
  {
    _id: 'style-hf-board-fence',
    title: 'Board Fence (Horizontal)',
    slug: 'board-fence-horizontal',
    styleId: 'hf-board-fence',
    code: 'HSB',
    typeCategory: 'Horizontal Fence',
    status: 'LIVE',
    templates: ['Base', 'Default', 'Homesteader', 'Rancher'],
    shortDescription: 'Horizontal board fence design featuring Homesteader & Rancher framing patterns.',
    sortOrder: 2
  },
  {
    _id: 'style-hf-horizontal-picket',
    title: 'Horizontal Picket',
    slug: 'horizontal-picket',
    styleId: 'hf-horizontal-picket',
    code: 'HPF',
    typeCategory: 'Horizontal Fence',
    status: 'LIVE',
    templates: ['Base', 'Default'],
    shortDescription: 'Sleek horizontal picket configuration with continuous line shadowbox alignment.',
    sortOrder: 3
  },
  {
    _id: 'style-hf-split-rail',
    title: 'Split Rail (Horizontal)',
    slug: 'split-rail-horizontal',
    styleId: 'hf-split-rail',
    code: 'HSR',
    typeCategory: 'Horizontal Fence',
    status: 'LIVE',
    templates: ['Base', 'Default'],
    shortDescription: 'Rustic horizontal split-rail fencing for acreage and boundary perimeters.',
    sortOrder: 4
  },
  {
    _id: 'style-fabric-welded-wire',
    title: 'Welded Wire (Fabric)',
    slug: 'welded-wire-fabric',
    styleId: 'fabric-welded-wire',
    code: 'WWR',
    typeCategory: 'Fabric Fence',
    status: 'LIVE',
    templates: ['Base', 'Default (TLB 2T Trim + Wire Grid)'],
    shortDescription: 'TLB 2T Trim cedar frame with integrated heavy gauge welded wire mesh grid.',
    sortOrder: 5
  },
  {
    _id: 'style-fabric-lattice',
    title: 'Lattice Privacy (Fabric)',
    slug: 'lattice-privacy-fabric',
    styleId: 'fabric-lattice',
    code: 'LAT',
    typeCategory: 'Fabric Fence',
    status: 'LIVE',
    templates: ['Base', 'Default (TLB 2T Trim + Lattice Infill)'],
    shortDescription: 'Decorative lattice panel infill with cedar border frame for garden & patio privacy.',
    sortOrder: 6
  },

  // --- Parked / Stubbed Registry Options ---
  {
    _id: 'style-vpf-composite-vinyl',
    title: 'Composite / Vinyl (Vertical)',
    slug: 'composite-vinyl-vertical',
    styleId: 'vpf-composite-vinyl',
    code: 'CVNL',
    typeCategory: 'Vertical Fence',
    status: 'STUBBED',
    templates: ['Base'],
    shortDescription: 'Low-maintenance vertical composite and vinyl privacy panel system.',
    sortOrder: 7
  },
  {
    _id: 'style-hf-cross-buck',
    title: 'Cross-Buck (Horizontal)',
    slug: 'cross-buck-horizontal',
    styleId: 'hf-cross-buck',
    code: 'HXB',
    typeCategory: 'Horizontal Fence',
    status: 'STUBBED',
    templates: ['Statesmen Pilot'],
    shortDescription: 'Equestrian cross-buck horizontal rail design.',
    sortOrder: 8
  },
  {
    _id: 'style-fabric-chain-link',
    title: 'Chain Link (Fabric)',
    slug: 'chain-link-fabric',
    styleId: 'fabric-chain-link',
    code: 'CLNK',
    typeCategory: 'Fabric Fence',
    status: 'STUBBED',
    templates: ['Base'],
    shortDescription: 'Galvanized or black vinyl-coated chain link mesh with wood or steel posts.',
    sortOrder: 9
  },
  {
    _id: 'style-hand-wood-baluster',
    title: 'Wood Baluster (Guardrail)',
    slug: 'wood-baluster-guardrail',
    styleId: 'hand-wood-baluster',
    code: 'HWB',
    typeCategory: 'Hand / Guardrail',
    status: 'STUBBED',
    templates: ['Base'],
    shortDescription: 'Deck and porch wood baluster guardrail system.',
    sortOrder: 10
  },
  {
    _id: 'style-hand-cable-metal',
    title: 'Cable / Metal (Guardrail)',
    slug: 'cable-metal-guardrail',
    styleId: 'hand-cable-metal',
    code: 'HCAB',
    typeCategory: 'Hand / Guardrail',
    status: 'STUBBED',
    templates: ['Base'],
    shortDescription: 'Modern stainless steel cable or metal spindle guardrail.',
    sortOrder: 11
  }
];

async function syncCommittedStyles() {
  console.log('🚀 Syncing Committed Fence Type & Style Catalog to Wix CMS...\n');

  for (const style of FENCE_STYLES_COMMITTED) {
    try {
      await wixClient.items.insert('FenceStyles', style);
      console.log(`  ✓ Inserted [${style.status}] ${style.typeCategory} → ${style.title} (${style.code})`);
    } catch (err) {
      try {
        await wixClient.items.save('FenceStyles', style);
        console.log(`  ✓ Saved/Updated [${style.status}] ${style.typeCategory} → ${style.title} (${style.code})`);
      } catch (saveErr) {
        console.warn(`  ⚠️ Could not save ${style.title}:`, saveErr.message || saveErr);
      }
    }
  }

  console.log('\n🎉 Committed Taxonomy Sync Complete!');
}

syncCommittedStyles();
