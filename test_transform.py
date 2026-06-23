"""Test file that executes the transformation."""
import os
import sys
import unittest

os.chdir(r'C:\AIGenXLab\Projects\Project-Baby')
sys.path.insert(0, r'C:\AIGenXLab\Projects\Project-Baby')

from transformation_script import MDXTransformer

class TestTransformation(unittest.TestCase):
    def test_run_transformation(self):
        """Run the MDX transformation and capture results."""
        transformer = MDXTransformer()
        root_path = r'C:\AIGenXLab\Projects\Project-Baby\content\products'

        # Run the transformation
        transformer.run(root_path)

        # Verify results
        self.assertGreater(transformer.files_processed, 0, "Should process at least one file")

        # Save results to file
        results_file = r'C:\AIGenXLab\Projects\Project-Baby\TEST_RESULTS.txt'
        with open(results_file, 'w', encoding='utf-8') as f:
            f.write(f"Total files processed: {transformer.files_processed}\n")
            f.write(f"section_reordered: {transformer.changes_by_type['section_reordered']}\n")
            f.write(f"custom_frontmatter_added: {transformer.changes_by_type['custom_frontmatter_added']}\n")
            f.write(f"word_count_adjusted: {transformer.changes_by_type['word_count_adjusted']}\n")
            f.write(f"heading_hierarchy_modified: {transformer.changes_by_type['heading_hierarchy_modified']}\n")
            f.write(f"faq_count_adjusted: {transformer.changes_by_type['faq_count_adjusted']}\n")
            f.write(f"why_this_matters_added: {transformer.changes_by_type['why_this_matters_added']}\n")
            f.write(f"related_articles_varied: {transformer.changes_by_type['related_articles_varied']}\n")
            f.write(f"errors: {len(transformer.changes_by_type['errors'])}\n")

if __name__ == '__main__':
    unittest.main()
