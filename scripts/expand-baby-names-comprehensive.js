/**
 * Comprehensive baby names expansion (1000+ names)
 * Uses free, public domain baby names from SSA rankings + common names
 * Run: node scripts/expand-baby-names-comprehensive.js
 */

const fs = require('fs');
const path = require('path');

// Comprehensive baby names database (free public domain names)
const COMPREHENSIVE_NAMES = [
  // Additional girl names (200+)
  { name: 'Aaliyah', gender: 'girl', origin: ['Arabic'], meaning: 'exalted', tags: ['modern', 'musical'] },
  { name: 'Abigail', gender: 'girl', origin: ['Hebrew'], meaning: 'father\'s joy', tags: ['biblical', 'classic'] },
  { name: 'Ada', gender: 'girl', origin: ['Germanic'], meaning: 'noble', tags: ['vintage', 'classic'] },
  { name: 'Adelaide', gender: 'girl', origin: ['Germanic'], meaning: 'noble', tags: ['classic', 'elegant'] },
  { name: 'Adeline', gender: 'girl', origin: ['Germanic'], meaning: 'noble', tags: ['vintage', 'elegant'] },
  { name: 'Adriana', gender: 'girl', origin: ['Latin'], meaning: 'from Hadria', tags: ['elegant', 'sophisticated'] },
  { name: 'Aisha', gender: 'girl', origin: ['Arabic'], meaning: 'alive, well', tags: ['modern', 'strong'] },
  { name: 'Alaina', gender: 'girl', origin: ['Scottish'], meaning: 'bright', tags: ['modern', 'bright'] },
  { name: 'Alana', gender: 'girl', origin: ['Gaelic'], meaning: 'rock', tags: ['nature', 'strong'] },
  { name: 'Alicia', gender: 'girl', origin: ['Germanic'], meaning: 'noble', tags: ['classic', 'elegant'] },
  { name: 'Alison', gender: 'girl', origin: ['Germanic'], meaning: 'noble kind', tags: ['friendly', 'classic'] },
  { name: 'Allison', gender: 'girl', origin: ['Germanic'], meaning: 'noble kind', tags: ['friendly', 'classic'] },
  { name: 'Alma', gender: 'girl', origin: ['Spanish'], meaning: 'soul', tags: ['poetic', 'vintage'] },
  { name: 'Amara', gender: 'girl', origin: ['Greek'], meaning: 'eternal', tags: ['eternal', 'strong'] },
  { name: 'Amber', gender: 'girl', origin: ['Arabic'], meaning: 'amber', tags: ['warm', 'nature'] },
  { name: 'Ami', gender: 'girl', origin: ['French'], meaning: 'friend', tags: ['short', 'friendly'] },
  { name: 'Amira', gender: 'girl', origin: ['Arabic'], meaning: 'princess', tags: ['royal', 'elegant'] },
  { name: 'Amy', gender: 'girl', origin: ['French'], meaning: 'beloved', tags: ['short', 'classic'] },
  { name: 'Anastasia', gender: 'girl', origin: ['Greek'], meaning: 'resurrection', tags: ['elegant', 'mythical'] },
  { name: 'Andrea', gender: 'girl', origin: ['Greek'], meaning: 'strong, brave', tags: ['strong', 'classic'] },
  { name: 'Andromeda', gender: 'girl', origin: ['Greek'], meaning: 'to think of a man', tags: ['mythical', 'celestial'] },
  { name: 'Angela', gender: 'girl', origin: ['Greek'], meaning: 'angel', tags: ['angelic', 'classic'] },
  { name: 'Angelina', gender: 'girl', origin: ['Greek'], meaning: 'angel', tags: ['angelic', 'elegant'] },
  { name: 'Anita', gender: 'girl', origin: ['Hebrew'], meaning: 'grace', tags: ['graceful', 'modern'] },
  { name: 'Anna', gender: 'girl', origin: ['Hebrew'], meaning: 'grace', tags: ['classic', 'biblical'] },
  { name: 'Annabelle', gender: 'girl', origin: ['Hebrew', 'Latin'], meaning: 'grace and beauty', tags: ['beautiful', 'elegant'] },
  { name: 'Anne', gender: 'girl', origin: ['Hebrew'], meaning: 'grace', tags: ['classic', 'royal'] },
  { name: 'Annette', gender: 'girl', origin: ['Hebrew'], meaning: 'grace', tags: ['classic', 'vintage'] },
  { name: 'Annie', gender: 'girl', origin: ['Hebrew'], meaning: 'grace', tags: ['classic', 'friendly'] },
  { name: 'Antonia', gender: 'girl', origin: ['Latin'], meaning: 'priceless', tags: ['valuable', 'elegant'] },
  { name: 'Anya', gender: 'girl', origin: ['Russian'], meaning: 'grace', tags: ['short', 'graceful'] },
  { name: 'Aphrodite', gender: 'girl', origin: ['Greek'], meaning: 'foam-born', tags: ['mythical', 'goddess'] },
  { name: 'Arabella', gender: 'girl', origin: ['Latin'], meaning: 'yielding to prayer', tags: ['elegant', 'vintage'] },
  { name: 'Ariana', gender: 'girl', origin: ['Greek'], meaning: 'silver', tags: ['modern', 'musical'] },
  { name: 'Ariella', gender: 'girl', origin: ['Hebrew'], meaning: 'lion of God', tags: ['strong', 'biblical'] },
  { name: 'Ariza', gender: 'girl', origin: ['Hebrew'], meaning: 'cedar', tags: ['nature', 'strong'] },
  { name: 'Arleen', gender: 'girl', origin: ['Irish'], meaning: 'pledge', tags: ['vintage', 'modern'] },
  { name: 'Arline', gender: 'girl', origin: ['Irish'], meaning: 'pledge', tags: ['vintage', 'classic'] },
  { name: 'Artemis', gender: 'girl', origin: ['Greek'], meaning: 'goddess of the hunt', tags: ['mythical', 'strong'] },
  { name: 'Artemisia', gender: 'girl', origin: ['Greek'], meaning: 'gift of Artemis', tags: ['mythical', 'historical'] },
  { name: 'Ashelyn', gender: 'girl', origin: ['English'], meaning: 'ash tree', tags: ['nature', 'modern'] },
  { name: 'Ashley', gender: 'girl', origin: ['English'], meaning: 'ash tree', tags: ['nature', 'modern'] },
  { name: 'Ashton', gender: 'girl', origin: ['English'], meaning: 'ash tree town', tags: ['nature', 'unisex'] },
  { name: 'Athena', gender: 'girl', origin: ['Greek'], meaning: 'goddess of wisdom', tags: ['mythical', 'wise'] },
  { name: 'Aubrey', gender: 'girl', origin: ['French'], meaning: 'elf ruler', tags: ['modern', 'whimsical'] },
  { name: 'Audrey', gender: 'girl', origin: ['English'], meaning: 'noble strength', tags: ['classic', 'elegant'] },
  { name: 'August', gender: 'girl', origin: ['Latin'], meaning: 'majestic', tags: ['unisex', 'strong'] },
  { name: '
