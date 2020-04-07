
if [ "$#" -ne 1 ] && [ "$#" -ne 2 ]; then
	echo "options:  buildUI, run"
	exit 1
fi

function buildUI {
	cd src/main/webapp
	npm run build
	if [ -d "../resources/static" ]
		then
			rm -R ../resources/static
			echo "resources/static is removed successfully"
			mv build ../resources/static
			echo "build directory is moved successfully"
		else
			mv build ../resources/static
			echo "build directory is moved successfully"
		fi

	echo "build done! :)"
	echo "Jobshaar Company 2020"
	cd ../../..
}

function Run {
	./mvnw spring-boot:run
}

for var in "$@"; do
	case $var in
		"buildUI")
			buildUI
		;;
		"run")
			Run
		;;
		*)
			echo "Invalid task: $var"
			echo "options:  buildUI, run"
			exit 1
	esac
done

# while [ -n "$1" ]; do # while loop starts

# 	case "$1" in

# 	-a) echo "-a option passed" ;; # Message for -a option

# 	-b) echo "-b option passed" ;; # Message for -b option

# 	-c) echo "-c option passed" ;; # Message for -c option

# 	*) echo "Option $1 not recognized" ;; # In case you typed a different option other than a,b,c

# 	esac

# 	shift

# done