class Resource {
  constructor(name) {
    this.name = name;
    this.lastCommit = -1;
    this.lastestVersion = null;
  }
  version() {
    let previousVersion = this.previousVersion;
    let version = new Version(this.previousVersion + 1, this.lastestVersion);

    this.lastestVersion = version;
    return version;
  }

  versionList() {
    let version = this.lastestVersion;
    let versions = [];
    
  }
}
