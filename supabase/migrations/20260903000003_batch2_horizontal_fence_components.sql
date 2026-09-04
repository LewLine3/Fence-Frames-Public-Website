-- =============================================================================
-- Fence Frames — Batch 2: Horizontal Fence (HF) Full Component Suite & Recipes
-- Migration: 20260903000003_batch2_horizontal_fence_components.sql
-- Styles: Rancher (HSB-RNCH), Homesteader (HSB-HMST), Horizontal Picket (HPF-HPKT)
-- Governed by: Canon 104x78 Vector Law, 2-Pass Architecture, Handbook §05, §06, §18
-- =============================================================================

BEGIN;

-- 1. Upsert Batch 2 Components into component_encyclopedia
INSERT INTO component_encyclopedia (
  sku, category, display_name, svg_atom_path, overlay_layer_id, z_index,
  description_body, durability_lifespan_years, hoa_approved_default,
  install_hours_unit, labor_unit_rate_cents, install_method_notes,
  big_box_primary, big_box_sku, unit_of_measure, qty_basis, qty_rate,
  heritage_pilot, si_view_default, active
) VALUES
  -- 4x6 Posts (5.5" wide face orientation)
  ('post-4x6-cedar', 'posts', '4×6 Western Red Cedar Post (8ft - Wide Face)', 'posts/sym-post-cedar-4x6.svg', 'sym-post-cedar-4x6', 10,
   'Architectural appearance-grade 4×6 Western Red Cedar structural post oriented with 5.5in wide face to elevation for bold horizontal line framing.', 20, true,
   0.560, 4200, 'Dig >=28in deep, 8in gravel drainage bed, pour 140 lb concrete. Plumb wide face true to elevation.',
   'home-depot', '312591040', 'ea', 'perPost', 1, true, false, true),

  ('post-4x6-pt', 'posts', '4×6 PT Ground Contact Post (8ft - Wide Face)', 'posts/sym-post-pt-4x6.svg', 'sym-post-pt-4x6', 10,
   'Heavy-duty UC4A ground-contact pressure-treated 4×6 structural post with 5.5in wide face orientation, engineered for Pacific Northwest wind loads.', 25, true,
   0.560, 4200, 'Dig >=28in deep, 8in gravel drainage bed, pour 140 lb concrete. Plumb wide face true to elevation.',
   'home-depot', '202287541', 'ea', 'perPost', 1, true, false, true),

  -- 4x6 Post Caps
  ('post-cap-4x6-cedar-pyramid', 'caps', '4×6 Cedar Pyramid Post Cap', 'caps/sym-post-cap-4x6-cedar-pyramid.svg', 'sym-post-cap-4x6-cedar-pyramid', 25,
   'Western Red Cedar pyramid post cap precision-milled for 4×6 posts (5.5in × 3.5in), protecting end-grain from rain rot.', 15, true,
   0.080, 600, 'Fasten with exterior silicone adhesive and 2 stainless finish brads.',
   'home-depot', '203498101', 'ea', 'perPost', 1, true, false, true),

  ('post-cap-4x6-metal-pyramid', 'caps', '4×6 Black Aluminum Pyramid Post Cap', 'caps/sym-post-cap-4x6-metal-pyramid.svg', 'sym-post-cap-4x6-metal-pyramid', 25,
   'Architectural powder-coated matte black aluminum pyramid cap for 4×6 rectangular posts.', 25, true,
   0.060, 450, 'Slide-on fit, secure with matching black stainless side set screws.',
   'home-depot', '318291046', 'ea', 'perPost', 1, true, false, true),

  ('post-cap-4x6-copper-pyramid', 'caps', '4×6 Solid Copper Pyramid Post Cap', 'caps/sym-post-cap-4x6-copper-pyramid.svg', 'sym-post-cap-4x6-copper-pyramid', 25,
   'Solid heavy-gauge raw copper pyramid post cap for 4×6 posts, aging naturally to classic verdigris.', 30, true,
   0.060, 450, 'Slide-on fit, secure with matching copper side nails.',
   'home-depot', '205491823', 'ea', 'perPost', 1, true, false, true),

  ('post-cap-4x6-solar-pyramid', 'caps', '4×6 Solar LED Pyramid Post Cap', 'caps/sym-post-cap-4x6-solar-pyramid.svg', 'sym-post-cap-4x6-solar-pyramid', 25,
   'Solar-powered ambient downward LED pyramid post cap with integrated battery and monocrystalline solar cell for 4×6 posts.', 10, true,
   0.090, 675, 'Verify solar collector orientation toward unobstructed south/west sky.',
   'home-depot', '301982146', 'ea', 'perPost', 1, true, false, true),

  -- Horizontal Boards (2x6 & 2x4)
  ('board-2x6-cedar-horizontal', 'rails', '2×6 Western Red Cedar Horizontal Board (8ft)', 'boards/sym-board-2x6-cedar-horizontal.svg', 'sym-board-2x6-cedar-horizontal', 14,
   'Architectural Select tight-knot Western Red Cedar 2×6 (actual 1.5in × 5.5in) horizontal board for Rancher butt-stack and Homesteader designs.', 20, true,
   0.060, 450, 'Fasten with HeadLOK spider-drive structural timber screws into post centerline.',
   'home-depot', '100139281', 'ea', 'perPanel', 3, true, false, true),

  ('board-2x6-pt-horizontal', 'rails', '2×6 PT Horizontal Board (8ft)', 'boards/sym-board-2x6-pt-horizontal.svg', 'sym-board-2x6-pt-horizontal', 14,
   'Ground Contact Hem-Fir #2 Prime pressure-treated 2×6 horizontal split board (actual 1.5in × 5.5in) with superior decay resistance.', 25, true,
   0.060, 450, 'Fasten with HeadLOK structural timber screws with 50% post lap.',
   'home-depot', '256310', 'ea', 'perPanel', 3, true, false, true),

  ('board-2x4-cedar-horizontal', 'rails', '2×4 Western Red Cedar Horizontal Board (8ft)', 'boards/sym-board-2x4-cedar-horizontal.svg', 'sym-board-2x4-cedar-horizontal', 14,
   'Western Red Cedar 2×4 (actual 1.5in × 3.5in) horizontal board for Homesteader standard split-board configurations.', 20, true,
   0.053, 400, 'Fasten with HeadLOK structural timber screws into post centerline.',
   'home-depot', '458540', 'ea', 'perPanel', 3, true, false, true),

  ('board-2x4-pt-horizontal', 'rails', '2×4 PT Horizontal Board (8ft)', 'boards/sym-board-2x4-pt-horizontal.svg', 'sym-board-2x4-pt-horizontal', 14,
   'Pressure-treated 2×4 horizontal board (actual 1.5in × 3.5in) for Homesteader split-board fencing.', 25, true,
   0.053, 400, 'Fasten with HeadLOK structural timber screws into post centerline.',
   'home-depot', '256280', 'ea', 'perPanel', 3, true, false, true),

  -- Horizontal Pickets
  ('picket-cedar-horizontal-1x6', 'pickets', '1×6 Cedar Horizontal Picket (8ft)', 'pickets/sym-picket-cedar-horizontal-1x6.svg', 'sym-picket-cedar-horizontal-1x6', 15,
   'Full-span Western Red Cedar 1×6 flat-top picket (actual 0.6875in × 5.5in) oriented horizontally with contemporary 0.5in reveal gaps.', 20, true,
   0.017, 125, 'Face fasten with stainless ring-shank nails or exterior trim screws into post face and center batten.',
   'home-depot', '458510', 'ea', 'perPanel', 12, true, false, true),

  -- 2x4 Center Vertical Trim Batten / Stiffener
  ('trim-vertical-center-2x4-cedar', 'trim', '2×4 Cedar Center Stiffener Trim Batten (6ft)', 'trim/sym-trim-vertical-center-2x4-cedar.svg', 'sym-trim-vertical-center-2x4-cedar', 18,
   'Vertical 2×4 Western Red Cedar center batten (actual 1.5in × 3.5in × 72in) stabilizing horizontal boards at midspan against cupping and deflection.', 20, true,
   0.100, 750, 'Secure through horizontal boards at midspan with HeadLOK structural timber screws.',
   'home-depot', '458542', 'ea', 'perPanel', 1, true, false, true),

  ('trim-vertical-center-2x4-pt', 'trim', '2×4 PT Center Stiffener Trim Batten (6ft)', 'trim/sym-trim-vertical-center-2x4-pt.svg', 'sym-trim-vertical-center-2x4-pt', 18,
   'Vertical 2×4 pressure-treated center batten stabilizing horizontal lumber at midspan.', 25, true,
   0.100, 750, 'Secure through horizontal boards at midspan with HeadLOK structural timber screws.',
   'home-depot', '256282', 'ea', 'perPanel', 1, true, false, true),

  -- Fasteners
  ('fastener-headlok-timber-screw', 'hardware', 'FastenMaster HeadLOK 2-7/8″ Structural Timber Screws (Box of 50)', 'fasteners/sym-fastener-headlok-timber-screw.svg', 'sym-fastener-headlok-timber-screw', 5,
   'Heavy-duty flat-washer HeadLOK spider-drive structural timber screws engineered for exterior horizontal fence framing without predrilling.', 25, true,
   0.003, 25, 'Drive flush with 18V impact driver using Spider drive bit.',
   'home-depot', '202268254', 'box', 'perPanel', 1, true, false, true)

ON CONFLICT (sku) DO UPDATE SET
  category = EXCLUDED.category,
  display_name = EXCLUDED.display_name,
  svg_atom_path = EXCLUDED.svg_atom_path,
  overlay_layer_id = EXCLUDED.overlay_layer_id,
  z_index = EXCLUDED.z_index,
  description_body = EXCLUDED.description_body,
  durability_lifespan_years = EXCLUDED.durability_lifespan_years,
  hoa_approved_default = EXCLUDED.hoa_approved_default,
  install_hours_unit = EXCLUDED.install_hours_unit,
  labor_unit_rate_cents = EXCLUDED.labor_unit_rate_cents,
  install_method_notes = EXCLUDED.install_method_notes,
  big_box_primary = EXCLUDED.big_box_primary,
  big_box_sku = EXCLUDED.big_box_sku,
  unit_of_measure = EXCLUDED.unit_of_measure,
  qty_basis = EXCLUDED.qty_basis,
  qty_rate = EXCLUDED.qty_rate,
  heritage_pilot = EXCLUDED.heritage_pilot,
  active = EXCLUDED.active,
  updated_at = NOW();

-- 2. Populate Multi-Vendor Pricing for Batch 2 Components
INSERT INTO component_vendor_pricing (
  component_id, component_sku, vendor, vendor_sku, price_usd, unit
)
SELECT c.id, v.sku, v.vendor, v.vendor_sku, v.price_usd, v.unit
FROM (VALUES
  -- 4x6 Posts
  ('post-4x6-cedar', 'homeDepot', '312591040', 34.98, 'ea'),
  ('post-4x6-cedar', 'lowes', '892104', 36.98, 'ea'),
  ('post-4x6-cedar', 'dunnLumber', 'CDR46-8', 33.50, 'ea'),
  ('post-4x6-cedar', 'chinook', 'CDR406-08', 34.25, 'ea'),

  ('post-4x6-pt', 'homeDepot', '202287541', 22.98, 'ea'),
  ('post-4x6-pt', 'lowes', '448160', 24.48, 'ea'),
  ('post-4x6-pt', 'dunnLumber', 'PT46-8', 21.90, 'ea'),
  ('post-4x6-pt', 'chinook', 'PT406-08', 22.50, 'ea'),

  -- 4x6 Post Caps
  ('post-cap-4x6-cedar-pyramid', 'homeDepot', '203498101', 8.48, 'ea'),
  ('post-cap-4x6-cedar-pyramid', 'lowes', '592810', 8.98, 'ea'),
  ('post-cap-4x6-cedar-pyramid', 'dunnLumber', 'CAP-46PYR-CD', 7.95, 'ea'),
  ('post-cap-4x6-cedar-pyramid', 'chinook', 'CAP-46PYR-CD', 8.25, 'ea'),

  ('post-cap-4x6-metal-pyramid', 'homeDepot', '318291046', 11.98, 'ea'),
  ('post-cap-4x6-metal-pyramid', 'lowes', '772914', 12.48, 'ea'),
  ('post-cap-4x6-metal-pyramid', 'dunnLumber', 'CAP-46ALUM-BK', 11.25, 'ea'),
  ('post-cap-4x6-metal-pyramid', 'chinook', 'CAP-46ALUM-BK', 11.50, 'ea'),

  ('post-cap-4x6-copper-pyramid', 'homeDepot', '205491823', 18.98, 'ea'),
  ('post-cap-4x6-copper-pyramid', 'lowes', '882910', 19.48, 'ea'),
  ('post-cap-4x6-copper-pyramid', 'dunnLumber', 'CAP-46COP-PYR', 17.95, 'ea'),
  ('post-cap-4x6-copper-pyramid', 'chinook', 'CAP-46COP-PYR', 18.25, 'ea'),

  ('post-cap-4x6-solar-pyramid', 'homeDepot', '301982146', 24.98, 'ea'),
  ('post-cap-4x6-solar-pyramid', 'lowes', '992813', 26.48, 'ea'),
  ('post-cap-4x6-solar-pyramid', 'dunnLumber', 'CAP-46SOL-LED', 23.95, 'ea'),
  ('post-cap-4x6-solar-pyramid', 'chinook', 'CAP-46SOL-LED', 24.50, 'ea'),

  -- Horizontal Boards
  ('board-2x6-cedar-horizontal', 'homeDepot', '100139281', 12.48, 'ea'),
  ('board-2x6-cedar-horizontal', 'lowes', '460670', 13.18, 'ea'),
  ('board-2x6-cedar-horizontal', 'dunnLumber', 'CDR26-8', 11.95, 'ea'),
  ('board-2x6-cedar-horizontal', 'chinook', 'CDR206-08', 12.25, 'ea'),

  ('board-2x6-pt-horizontal', 'homeDepot', '256310', 8.98, 'ea'),
  ('board-2x6-pt-horizontal', 'lowes', '448180', 9.48, 'ea'),
  ('board-2x6-pt-horizontal', 'dunnLumber', 'PT26-8', 8.50, 'ea'),
  ('board-2x6-pt-horizontal', 'chinook', 'PT206-08', 8.75, 'ea'),

  ('board-2x4-cedar-horizontal', 'homeDepot', '458540', 8.48, 'ea'),
  ('board-2x4-cedar-horizontal', 'lowes', '460660', 8.98, 'ea'),
  ('board-2x4-cedar-horizontal', 'dunnLumber', 'CDR24-8', 7.95, 'ea'),
  ('board-2x4-cedar-horizontal', 'chinook', 'CDR204-08', 8.25, 'ea'),

  ('board-2x4-pt-horizontal', 'homeDepot', '256280', 5.98, 'ea'),
  ('board-2x4-pt-horizontal', 'lowes', '448120', 6.48, 'ea'),
  ('board-2x4-pt-horizontal', 'dunnLumber', 'PT24-8', 5.75, 'ea'),
  ('board-2x4-pt-horizontal', 'chinook', 'PT204-08', 5.85, 'ea'),

  -- Horizontal Pickets
  ('picket-cedar-horizontal-1x6', 'homeDepot', '458510', 4.28, 'ea'),
  ('picket-cedar-horizontal-1x6', 'lowes', '93212', 4.48, 'ea'),
  ('picket-cedar-horizontal-1x6', 'dunnLumber', 'CDR16-8FT', 4.15, 'ea'),
  ('picket-cedar-horizontal-1x6', 'chinook', 'CDR106-08', 4.25, 'ea'),

  -- 2x4 Center Trim
  ('trim-vertical-center-2x4-cedar', 'homeDepot', '458542', 8.48, 'ea'),
  ('trim-vertical-center-2x4-cedar', 'lowes', '460662', 8.98, 'ea'),
  ('trim-vertical-center-2x4-cedar', 'dunnLumber', 'CDR24-8', 7.95, 'ea'),
  ('trim-vertical-center-2x4-cedar', 'chinook', 'CDR204-08', 8.25, 'ea'),

  ('trim-vertical-center-2x4-pt', 'homeDepot', '256282', 5.98, 'ea'),
  ('trim-vertical-center-2x4-pt', 'lowes', '448122', 6.48, 'ea'),
  ('trim-vertical-center-2x4-pt', 'dunnLumber', 'PT24-8', 5.75, 'ea'),
  ('trim-vertical-center-2x4-pt', 'chinook', 'PT204-08', 5.85, 'ea'),

  -- Fasteners
  ('fastener-headlok-timber-screw', 'homeDepot', '202268254', 28.98, 'box'),
  ('fastener-headlok-timber-screw', 'lowes', '682914', 30.48, 'box'),
  ('fastener-headlok-timber-screw', 'dunnLumber', 'HLOK-278-50', 27.50, 'box'),
  ('fastener-headlok-timber-screw', 'chinook', 'HLOK-278-50', 28.00, 'box')
) AS v(sku, vendor, vendor_sku, price_usd, unit)
JOIN component_encyclopedia c ON c.sku = v.sku
ON CONFLICT (component_sku, vendor) DO UPDATE SET
  vendor_sku = EXCLUDED.vendor_sku,
  price_usd = EXCLUDED.price_usd,
  unit = EXCLUDED.unit,
  last_verified_at = NOW();

-- 3. Update / Insert Labor Rates for Batch 2
INSERT INTO labor_rates (
  rate_key, category, label, unit_type, base_wage_per_hr, shop_rate_per_hr,
  hours_per_unit, unit_billable_usd, notes
) VALUES
  ('POST_4X6_INSTALL', 'framing', '4×6 Structural Post Excavation & Concrete Setting', 'per_post', 30.00, 75.00, 0.560, 42.00, 'Heavy 4×6 timber post hole digging, plumb alignment, and 140 lb concrete embedment.'),
  ('HORIZONTAL_PICKET_INFILL', 'infill', 'Horizontal Cedar Pickets Infill (0.5in Reveal / Privacy)', 'per_lf', 30.00, 75.00, 0.130, 9.75, 'Full-span horizontal picket positioning, reveal spacing, and stainless pneumatic fastening.'),
  ('CENTER_TRIM_STIFFENER', 'trim', '2×4 Vertical Center Stiffener Batten Installation', 'per_lf', 30.00, 75.00, 0.047, 3.50, 'Centerline plumb mounting and structural timber screw fastening through boards.')
ON CONFLICT (rate_key) DO UPDATE SET
  category = EXCLUDED.category,
  label = EXCLUDED.label,
  unit_type = EXCLUDED.unit_type,
  shop_rate_per_hr = EXCLUDED.shop_rate_per_hr,
  hours_per_unit = EXCLUDED.hours_per_unit,
  unit_billable_usd = EXCLUDED.unit_billable_usd,
  notes = EXCLUDED.notes;

-- 4. Populate Style Recipes for Batch 2 Horizontal Styles
-- Rancher (HSB-RNCH)
INSERT INTO style_recipes (style_key, component_sku, quantity_formula, is_required, notes) VALUES
  ('rancher-v1', 'post-4x6-cedar', '(linearFeet / 8) + 1', true, '4×6 Cedar posts at 8ft bays'),
  ('rancher-v1', 'board-2x6-cedar-horizontal', '(linearFeet / 8) * 3', true, '3× 2×6 horizontal split boards per 8ft panel'),
  ('rancher-v1', 'trim-vertical-center-2x4-cedar', 'linearFeet / 8', true, 'One 2×4 center vertical stiffener batten per bay'),
  ('rancher-v1', 'fastener-headlok-timber-screw', 'CEIL((linearFeet / 8) * 9 / 50)', true, '9 HeadLOK screws per bay (3 per board: left post, center trim, right post)'),
  ('rancher-v1', 'concrete-post-set', '((linearFeet / 8) + 1) * 2', true, '2 bags (100-120 lb) concrete per 4×6 post'),
  ('rancher-v1', 'aggregate-base', '(linearFeet / 8) + 1', true, '1 bag crushed drainage rock per post')
ON CONFLICT (style_key, component_sku) DO UPDATE SET
  quantity_formula = EXCLUDED.quantity_formula,
  is_required = EXCLUDED.is_required,
  notes = EXCLUDED.notes;

-- Homesteader (HSB-HMST)
INSERT INTO style_recipes (style_key, component_sku, quantity_formula, is_required, notes) VALUES
  ('homesteader-v1', 'post-4x6-pt', '(linearFeet / 8) + 1', true, '4×6 PT posts at 8ft bays'),
  ('homesteader-v1', 'board-2x6-pt-horizontal', '(linearFeet / 8) * 3', true, '3× 2×6 PT split boards per 8ft panel with open view gaps'),
  ('homesteader-v1', 'trim-vertical-center-2x4-pt', 'linearFeet / 8', true, 'One 2×4 center vertical stiffener batten per bay'),
  ('homesteader-v1', 'fastener-headlok-timber-screw', 'CEIL((linearFeet / 8) * 18 / 50)', true, '18 HeadLOK screws per bay (2 per connection point)'),
  ('homesteader-v1', 'concrete-post-set', '((linearFeet / 8) + 1) * 2', true, '2 bags concrete per post'),
  ('homesteader-v1', 'aggregate-base', '(linearFeet / 8) + 1', true, '1 bag crushed drainage rock per post')
ON CONFLICT (style_key, component_sku) DO UPDATE SET
  quantity_formula = EXCLUDED.quantity_formula,
  is_required = EXCLUDED.is_required,
  notes = EXCLUDED.notes;

-- Horizontal Picket (HPF-HPKT)
INSERT INTO style_recipes (style_key, component_sku, quantity_formula, is_required, notes) VALUES
  ('horizontal-picket-v1', 'post-4x6-cedar', '(linearFeet / 8) + 1', true, '4×6 Cedar posts at 8ft bays'),
  ('horizontal-picket-v1', 'picket-cedar-horizontal-1x6', '(linearFeet / 8) * 12', true, '12× 1×6 horizontal cedar pickets per 8ft panel'),
  ('horizontal-picket-v1', 'trim-vertical-center-2x4-cedar', 'linearFeet / 8', true, 'One 2×4 center vertical stiffener batten per bay'),
  ('horizontal-picket-v1', 'fastener-headlok-timber-screw', 'CEIL((linearFeet / 8) * 36 / 50)', true, 'Timber screws securing center trim and picket ends'),
  ('horizontal-picket-v1', 'concrete-post-set', '((linearFeet / 8) + 1) * 2', true, '2 bags concrete per post'),
  ('horizontal-picket-v1', 'aggregate-base', '(linearFeet / 8) + 1', true, '1 bag crushed drainage rock per post')
ON CONFLICT (style_key, component_sku) DO UPDATE SET
  quantity_formula = EXCLUDED.quantity_formula,
  is_required = EXCLUDED.is_required,
  notes = EXCLUDED.notes;

COMMIT;
