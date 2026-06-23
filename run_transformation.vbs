Dim shell, exec, output
Set shell = CreateObject("WScript.Shell")

' Run the Python script and capture output
Set exec = shell.Exec("python transformation_script.py")

' Get output
output = exec.StdOut.ReadAll()

' Write to log file
Set fso = CreateObject("Scripting.FileSystemObject")
Set logFile = fso.CreateTextFile("transformation_output.txt", True)
logFile.Write output
logFile.Close()

' Also display in a message (limited but visible)
shell.Popup "Transformation completed! Check transformation_output.txt for results.", 5, "Script Complete"
