class Resource {
  constructor(name, content) {
    this.name = name;
    this.lastCommitId = -1;
    this.HEAD = null;
    this.version(content);
  }
  version(content) {
    let version = new Version(++this.lastCommitId, this.HEAD, content);
    this.HEAD = version;
    return version;
  }

  versionList() {
    let version = this.HEAD;
    let versions = [];

    while(version) {
      versions.push(version);
      version = version.parent;
    }

    return versions;
  }
}

this.Resource = Resource;
