all:
	@uglifyjs -nc -o notificon.min.js notificon.js

clean:
	@rm notificon.min.js

.PHONY: clean all