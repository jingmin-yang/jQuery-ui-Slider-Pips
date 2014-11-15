/*global module:false*/
module.exports = function(grunt) {

    require("time-grunt")(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON("package.json"),

        banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " + 
                "<%= grunt.template.today(\"yyyy-mm-dd\") %>\n" + 
                "<%= pkg.homepage ? \"* \" + pkg.homepage + \"\\n\" : \"\" %>" + 
                "* Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author %>;" + 
                " Licensed <%= pkg.license %> */\n",

        // Task configuration.

        bake: {
            options: {
                basePath: "src/app/views"
            },
            build: {
                files: {
                    "index.html": "src/index.html"
                }
            }
        },

        concat: {
            options: {
                banner: "<%= banner %>",
                stripBanners: true
            }
        },


        uglify: {
            options: {
                banner: "<%= banner %>"
            }
        },


        jshint: {
            jshintrc: ".jshintrc",
            gruntfile: {
                src: "Gruntfile.js"
            },
            srcfiles: {
                src: ["src/**/*.js"]
            }
        },


        copy: {
            options: {
                banner: "<%= banner %>"
            }
        },

        sass: {
            all: {
                options: {
                    style: "expanded",
                    lineNumbers: true
                },
                files: {
                    "dist/css/app.css": "src/app/sass/app.scss"
                }
            }
        },

        wiredep: {
            options: {
                exclude: [ "/modernizr/", "/jquery-ui/" ]
            },
            task: {
                src: [ "index.html" ]
            }
        },

        watch: {
            config: {
                files: ["Gruntfile.js"]
            },
            render: {
                files: ["src/**/*.html"],
                tasks: ["bake", "wiredep"]
            },
            sass: {
                files: ["src/**/*.scss"],
                tasks: ["sass"]
            }
        }


    });

    // These plugins provide necessary tasks.

    grunt.loadNpmTasks("grunt-bake");
    grunt.loadNpmTasks("grunt-usemin");
    grunt.loadNpmTasks("grunt-wiredep");
    grunt.loadNpmTasks("grunt-autoprefixer");

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // Tasks.

    grunt.registerTask("build", ["jshint", "bake", "wiredep", "sass"]);
    
    grunt.registerTask("default", ["build", "watch"]);

};
