""" will register signal handlers, moved out of __init__.py to ensure correct loading order post Django 1.7 """
import signals
import openedx.core.djangoapps.content.course_structures.signals