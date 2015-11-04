# ShadowClone

An experiment to simulate a "git-like" (or version-control-like) system for storing and using objects/docs using MongoDB.

##### Thoughts/Notes

Need support for: versioning, lineage (ancestry)

* Resource: repo, master branch
* Use of Resource: a non-master branch, off master
* A new version of resource: a commit (each edit/save operation creates a new version of the resource)
* Resource can be "used" at any version (default: latest)
* Changes in branches/usages are not/cannot be "pushed" to master
