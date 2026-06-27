import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'pregnancysprout',
  title: 'PregnancySprout Admin',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('✅ Published Products')
              .child(
                S.documentList()
                  .title('Published Products')
                  .filter('_type == "productReview" && published == true')
                  .defaultOrdering([{ field: 'productName', direction: 'asc' }])
              ),
            S.listItem()
              .title('⏸️ Draft Products')
              .child(
                S.documentList()
                  .title('Draft Products')
                  .filter('_type == "productReview" && (published == false || !defined(published))')
                  .defaultOrdering([{ field: 'productName', direction: 'asc' }])
              ),
            S.divider(),
            S.listItem()
              .title('📦 All Products')
              .child(
                S.documentList()
                  .title('All Products')
                  .filter('_type == "productReview"')
                  .defaultOrdering([{ field: 'category', direction: 'asc' }])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
