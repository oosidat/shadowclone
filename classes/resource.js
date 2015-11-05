class Resource {
  constructor(name) {
    this.name = name;
    this.lastCommitId = -1;
    this.branches = [];

    let master = new Branch('master', null);
    this.branches.push(master);

    this.HEAD = master;
  }

  use(branchName) {
    let newBranch = new Branch(branchName, this.HEAD.commit);
    this.branches.push(newBranch);
  }
  version(content) {
    let version = new Version(++this.lastCommitId, this.HEAD.version, content);
    this.HEAD.version = version;
    return version;
  }

  versionList() {
    let version = this.HEAD.commit;
    let versions = [];

    while(version) {
      versions.push(version);
      version = version.parent;
    }

    return versions;
  }
}

this.Resource = Resource;
