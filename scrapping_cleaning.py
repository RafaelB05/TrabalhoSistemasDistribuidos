import subprocess

script_path = "./scrapping.sh"

process = subprocess.Popen(['bash',script_path],stdout=subprocess.PIPE, stderr=subprocess.PIPE)

stdout, stderr = process.communicate()

# Validar se houve
if process.returncode != 0:
    print(f"Error: {stderr.decode()}")
else:
    print("Script executed successfully")
    print(stdout.decode())

