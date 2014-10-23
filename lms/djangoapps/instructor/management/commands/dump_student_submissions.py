"""
Management command to dump CSV student responses for a course.
"""
import csv
from optparse import make_option

from django.core.management.base import BaseCommand, CommandError

from instructor_analytics.basic import student_submissions
from xmodule.modulestore.django import modulestore
from opaque_keys import InvalidKeyError
from opaque_keys.edx.locations import SlashSeparatedCourseKey


class Command(BaseCommand):
    """
    Writes CSV student responses to all problems in specified course to
    specified file, or stdout by default.
    """
    args = '<course_id>'
    help = __doc__
    option_list = BaseCommand.option_list + (
        make_option('-o', '--output-file',
                    dest='filename',
                    help='Write CSV to FILENAME, defaults to stdout'),
        make_option('--all-students',
                    action='store_true',
                    dest='all_students',
                    default=False,
                    help='Include students who have not answered any questions'),
        )

    def handle(self, *args, **options):
        if not args:
            raise CommandError("course_id not specified")

        store = modulestore()

        try:
            course_id = SlashSeparatedCourseKey.from_deprecated_string(args[0])
        except InvalidKeyError:
            raise CommandError("Invalid course_id")

        course = store.get_course(course_id)
        if course is None:
            raise CommandError("Invalid course_id")

        header, datarows = student_submissions(course, options['all_students'])
        rows = [header] + datarows

        if not options['filename']:
            csvwriter = csv.writer(self.stdout, dialect='excel', quotechar='"', quoting=csv.QUOTE_ALL)
            csvwriter.writerows(rows)
        else:
            with open(options['filename'], 'wb') as csvfile:
                csvwriter = csv.writer(csvfile, dialect='excel', quotechar='"', quoting=csv.QUOTE_ALL)
                csvwriter.writerows(rows)
