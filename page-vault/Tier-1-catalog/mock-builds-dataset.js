/**
 * Backend Web Module — Airtable & Configurator Catalog Provider
 * File: src/backend/airtable.jsw
 */

import wixData from 'wix-data';

/**
 * Fallback dataset for active fence builds (Heritage, Horizon, Rancher series).
 */
const MOCK_BUILDS = [
  {
    _id: 'build-heritage-vpf-01',
    name: 'Heritage Vertical Picket (Si View Pilot)',
    productLine: 'Heritage',
    priceTier: '$$$',
    description: 'Classic vertical wood picket fence engineered with pre-assembled panel frames, galvanized steel posts, and optional ARC-compliant top cap.',
    heroImage: 'https://static.wixstatic.com/media/2510-Si-View-Picket-Stepehen-1.png',
    presetSlug: 'si-view',
    track: 'Residential',
    subTrack: 'HOA Compliant'
  },
  {
    _id: 'build-horizon-privacy-01',
    name: 'Horizon Horizontal Board-on-Board',
    productLine: 'Horizon',
    priceTier: '$$$$',
    description: 'Modern horizontal board fence providing complete acoustic and visual privacy with integrated steel framework.',
    heroImage: 'https://static.wixstatic.com/media/horizon-preview.png',
    presetSlug: 'horizon-standard',
    track: 'Residential',
    subTrack: 'Modern Horizontal'
  },
  {
    _id: 'build-rancher-split-rail-01',
    name: 'Rancher 3-Rail Split Rail',
    productLine: 'Rancher',
    priceTier: '$',
    description: 'Rustic post and rail fence with optional black wire mesh backing, ideal for open boundaries and acreage.',
    heroImage: 'https://static.wixstatic.com/media/rancher-preview.png',
    presetSlug: 'rancher-3rail',
    track: 'Acreage / Farm',
    subTrack: 'Post & Rail'
  }
];

const MOCK_TRACKS = ['Residential', 'Acreage / Farm', 'Commercial'];
const MOCK_SUBTRACKS = ['HOA Compliant', 'Modern Horizontal', 'Post & Rail', 'Custom Picket'];

/**
 * Fetch active builds/designs from Wix CMS or Airtable cache with fallback.
 */
export async function getActiveBuilds() {
  try {
    const results = await wixData.query('FenceDesigns')
      .eq('active', true)
      .ascending('sortOrder')
      .find();

    if (results.items && results.items.length > 0) {
      return results.items;
    }
  } catch (err) {
    console.warn('[backend/airtable] wixData query failed or collection missing, using fallback builds dataset', err);
  }
  return MOCK_BUILDS;
}

/**
 * Fetch available product tracks.
 */
export async function getTracks() {
  return MOCK_TRACKS;
}

/**
 * Fetch available sub-tracks.
 */
export async function getSubTracks() {
  return MOCK_SUBTRACKS;
}

/**
 * Get preset configuration details by preset ID (e.g. 'si-view').
 */
export async function getCommunityPreset(presetSlug) {
  if (!presetSlug) return null;
  const build = MOCK_BUILDS.find(b => b.presetSlug === presetSlug.toLowerCase());
  if (build) return build;

  return {
    presetSlug,
    name: `Community Preset (${presetSlug})`,
    productLine: 'Heritage',
    priceTier: '$$$'
  };
}
