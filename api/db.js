class InMemoryDatabase {
  constructor() {
    this.tables = {};
    this.lastIds = {};
  }

  select(tableName) {
    if (this.tables[tableName]) {
      return this.tables[tableName];
    } else {
      return [];
    }
  }

  selectById(tableName, id) {
    const table = this.tables[tableName];
    if (table) {
      return table.find((entry) => entry.id === id) || null;
    } else {
      return null;
    }
  }

  update(tableName, id, data) {
    const table = this.tables[tableName];
    if (table) {
      const entry = table.find((entry) => entry.id === id);
      if (entry) {
        Object.assign(entry, data);
        return true;
      }
    }
    return false;
  }

  insert(tableName, data) {
    if (!this.tables[tableName]) {
      this.tables[tableName] = [];
      this.lastIds[tableName] = 0;
    }
    const nextId = this.lastIds[tableName] + 1;
    const entry = { id: nextId, ...data };
    this.tables[tableName].push(entry);
    this.lastIds[tableName] = nextId;
    return nextId;
  }
}

const db = new InMemoryDatabase();








