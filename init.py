import subprocess
import sys

if len(sys.argv) == 2:
	commands = [ sys.argv[1] ]
else:
	print "Hello BL project :)"
	commands = [ '{BL-activemq}', '{BL-mongo}', '{BL-server}', '{BL-client}', '{BL-soap}' ]

for command in commands:
	subprocess.Popen('ConEmu64.exe -reuse -run ' + command.encode('utf-8'), shell = True)
