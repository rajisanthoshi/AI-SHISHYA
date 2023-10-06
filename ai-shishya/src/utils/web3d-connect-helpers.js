import { Euler as e, Quaternion as t, Vector3 as n, Color as i, Line3 as o, Matrix4 as r, Vector2 as s } from "./web3d.js";
import { TrimbimModel as a, ClipPlaneTool as c } from "./web3d-plugin-trimbim.js";
import {
  CloudMarkupTool as d,
  LineMarkupTool as u,
  ArrowMarkupTool as l,
  TextMarkupTool as p,
  FreelineMarkupTool as f,
  PointMarkupTool as m,
  MeasurementTool as g,
  AngleMeasurementTool as v,
} from "./web3d-plugin-markup.js";
import { PointIconModel as h, IconsPlugin as y } from "./web3d-plugin-icons.js";
import { ConnectIdentifierBuilder as w } from "./ConnectIdentifier.js";
const C = {},
  T = (function (e) {
    if (C[e]) return C[e];
    const t = {},
      n = { debug: "#7f8c8d", log: "#2ecc71", warn: "#f39c12", error: "#c0392b" },
      print = (t, ...i) => {
        const o = [
          `%c${e}`,
          [`border: 1px solid ${n[t]}`, "border-radius: 0.5em", `color: ${n[t]}`, "font-weight: bold", "padding: 2px 0.5em"].join(";"),
        ];
        console[t](...o, ...i);
      };
    for (const e of Object.keys(n)) t[e] = (...t) => print(e, ...t);
    return (C[e] = t), t;
  })("App");
function logDebug(...e) {
  T.debug(...e);
}
function logError(...e) {
  T.error(...e);
}
function logWarning(...e) {
  T.warn(...e);
}
function defined(...e) {
  return e && -1 === e.findIndex((e) => void 0 === e);
}
new Promise((e) => {});
class P {
  storage = new Map();
  itemInsertionCallback;
  get length() {
    return this.storage.size;
  }
  getItem(e) {
    const t = this.storage.get(e);
    return void 0 === t ? null : t;
  }
  setItem(e, t) {
    this.storage.set(e, t), this.itemInsertionCallback && this.itemInsertionCallback(this.length);
  }
  removeItem(e) {
    this.storage.delete(e);
  }
  clear() {
    return this.storage.clear();
  }
  key(e) {
    const t = [];
    for (const e of this.storage.keys()) t.push(e);
    return t[e];
  }
}
class k {
  storageType;
  _underlyingStorage;
  constructor(e) {
    (this.storageType = e), (this._underlyingStorage = this.getStorage());
  }
  getStorage() {
    let e;
    try {
      e = "undefined" == typeof window ? global[this.storageType] : window[this.storageType];
      const t = "__storage_test__";
      return e.setItem(t, t), e.removeItem(t), e;
    } catch (t) {
      if ((22 !== t.code && 1014 !== t.code && "QuotaExceededError" !== t.name && "NS_ERROR_DOM_QUOTA_REACHED" !== t.name) || !e || 0 === e.length) {
        const e = "undefined" == typeof window ? global : window,
          t = `emulated${this.storageType}`;
        return e.hasOwnProperty(t) || (e[t] = new P()), e[t];
      }
      throw t;
    }
  }
  get underlyingStorage() {
    return this._underlyingStorage;
  }
  reload() {
    this._underlyingStorage = this.getStorage();
  }
  get length() {
    return this._underlyingStorage.length;
  }
  getItem(e) {
    return this._underlyingStorage.getItem(e);
  }
  setItem(e, t) {
    return this._underlyingStorage.setItem(e, t);
  }
  removeItem(e) {
    return this._underlyingStorage.removeItem(e);
  }
  clear() {
    return this._underlyingStorage.clear();
  }
  key(e) {
    return this._underlyingStorage.key(e);
  }
}
function cross(e, t) {
  return { x: e.y * t.z - e.z * t.y, y: e.z * t.x - e.x * t.z, z: e.x * t.y - e.y * t.x };
}
function dot(e, t) {
  return e.x * t.x + e.y * t.y + e.z * t.z;
}
function magnitude(e) {
  return Math.sqrt(
    (function (e) {
      return dot(e, e);
    })(e),
  );
}
function normalize(e) {
  return scale(e, 1 / magnitude(e));
}
function scale(e, t) {
  return { x: e.x * t, y: e.y * t, z: e.z * t };
}
function vector3(e, t, n) {
  return { x: e, y: t, z: n };
}
var E, O;
new k("localStorage"),
  new k("sessionStorage"),
  (function (e) {
    (e[(e.AllowNegative = 1)] = "AllowNegative"),
      (e[(e.AllowIntegers = 2)] = "AllowIntegers"),
      (e[(e.AllowDecimals = 4)] = "AllowDecimals"),
      (e[(e.AllowScientific = 8)] = "AllowScientific"),
      (e[(e.AllowFractions = 16)] = "AllowFractions"),
      (e[(e.Any = 31)] = "Any");
  })(E || (E = {})),
  (function (e) {
    (e[(e.Feet = 0)] = "Feet"), (e[(e.Inches = 1)] = "Inches"), (e[(e.FeetInches = 2)] = "FeetInches");
  })(O || (O = {}));
class b extends Error {
  constructor(e, t, n) {
    super(b.formatMessage(e, t)),
      (this.response = e),
      (this.errorMessage = t),
      (this.errorCode = n),
      Error.captureStackTrace && Error.captureStackTrace(this, b);
  }
  static formatMessage(e, t) {
    return `HTTP ${e.status} (${e.statusText}): ${t}`;
  }
}
var V = {};
Object.defineProperty(V, "__esModule", { value: !0 });
var I =
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        },
  j = "undefined" != typeof window && void 0 !== window.document,
  S = "object" === ("undefined" == typeof self ? "undefined" : I(self)) && self.constructor && "DedicatedWorkerGlobalScope" === self.constructor.name,
  M = "undefined" != typeof process && null != process.versions && null != process.versions.node;
(V.isBrowser = j),
  (V.isWebWorker = S),
  (V.isNode = M),
  (V.isJsDom = function () {
    return (
      ("undefined" != typeof window && "nodejs" === window.name) || navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")
    );
  });
var __awaiter$3 = function (e, t, n, i) {
  return new (n || (n = Promise))(function (o, r) {
    function fulfilled(e) {
      try {
        step(i.next(e));
      } catch (e) {
        r(e);
      }
    }
    function rejected(e) {
      try {
        step(i.throw(e));
      } catch (e) {
        r(e);
      }
    }
    function step(e) {
      var t;
      e.done
        ? o(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              })).then(fulfilled, rejected);
    }
    step((i = i.apply(e, t || [])).next());
  });
};
class x {
  constructor(e, t, n) {
    (this.service = e), (this.response = t), (this.data = n), (this.retryCount = 0);
  }
  hasNextPage() {
    if (this.data && this.data.hasOwnProperty("next")) {
      return null !== this.data.next;
    }
    return !1;
  }
  nextPage() {
    return __awaiter$3(this, void 0, void 0, function* () {
      if (!this.hasNextPage()) throw new Error("There is no next page for this response.");
      const e = this.data.next;
      return this.service.makeRequest(e);
    });
  }
}
var F,
  __awaiter$2 = function (e, t, n, i) {
    return new (n || (n = Promise))(function (o, r) {
      function fulfilled(e) {
        try {
          step(i.next(e));
        } catch (e) {
          r(e);
        }
      }
      function rejected(e) {
        try {
          step(i.throw(e));
        } catch (e) {
          r(e);
        }
      }
      function step(e) {
        var t;
        e.done
          ? o(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(fulfilled, rejected);
      }
      step((i = i.apply(e, t || [])).next());
    });
  };
function extractEndpoint(e) {
  const t = e.indexOf("//"),
    n = e.indexOf("/", t + 2);
  return e.substring(0, n);
}
function delay(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
class $ {
  constructor(e) {
    if (((this.config = e), (this.defaultRetryCount = 3), !this.config.serviceUri)) throw new Error("The serviceUri is required");
  }
  makeRequest(e, t = "GET", n, i, o = !0) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const r = new Headers({ Accept: "application/json" });
      i &&
        i.forEach((e, t) => {
          r.append(t, e);
        });
      const s = yield this.request(e, t, n, r, o);
      if (204 !== s.response.status) {
        const e = s.response.headers.get("content-type");
        if (null !== e && -1 === e.indexOf("application/json"))
          throw new b(s.response, "Cannot deserialize response body as it is not in a JSON format.");
        s.data = yield s.response.json();
      }
      return s;
    });
  }
  getItemsWithPages(e, t, n, i, o, r = !0) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const s = null != o ? o : new Headers();
      s.has("Range") && s.delete("Range");
      const a = { start: 0, end: n - 1 };
      s.append("Range", `items=${a.start}-${a.end}`);
      let c = yield this.makeRequest(e, "GET", i, s, r);
      for (;;) {
        const o = this.getRange(c);
        let d;
        if (
          (Array.isArray(c.data) &&
            0 !== c.data.length &&
            o &&
            o.total &&
            o.end < o.total - 1 &&
            o &&
            o.total &&
            (s.delete("Range"),
            (a.start = o.end + 1),
            (a.end = Math.min(o.total - 1, a.start + n - 1)),
            s.append("Range", `items=${a.start}-${a.end}`),
            (d = this.makeRequest(e, "GET", i, s, r))),
          t(c),
          !d)
        )
          break;
        c = yield d;
      }
    });
  }
  request(e, t = "GET", n, i, o = !0) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const r = e.startsWith("http") ? e : e.startsWith("/") ? extractEndpoint(this.config.serviceUri) + e : this.config.serviceUri + e,
        s = new Headers();
      return (
        (i ? i.get("Content-Type") : void 0) || void 0 === n || s.set("Content-Type", "application/json"),
        i &&
          i.forEach((e, t) => {
            s.append(t, e);
          }),
        this.fetchWithRetry(r, { body: n, headers: s, method: t, redirect: "follow" }, o)
      );
    });
  }
  maxRetries() {
    return void 0 !== this.config.maxRetries ? this.config.maxRetries : this.defaultRetryCount;
  }
  calculateRetryDelay(e) {
    if (0 === e) return 0;
    {
      const t = 100;
      return Math.random() * (Math.pow(2, e - 1) * t);
    }
  }
  retryableError(e) {
    return !!(
      this.timeoutError(e) ||
      this.networkingError(e) ||
      this.expiredCredentialsError(e) ||
      this.throttledError(e) ||
      e.response.status >= 500
    );
  }
  networkingError(e) {
    return "NetworkingError" === e.errorCode;
  }
  timeoutError(e) {
    return "TimeoutError" === e.errorCode;
  }
  expiredCredentialsError(e) {
    if (401 === e.response.status) {
      const e = this.config.credentials;
      return e && "boolean" == typeof e.expired && (e.expired = !0), !0;
    }
    return !1;
  }
  throttledError(e) {
    return 429 === e.response.status;
  }
  fetchWithRetry(e, t, n = !0) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const i = this.config.logger,
        o = new x(this, new Response(), void 0);
      for (;;) {
        const r = this.config.credentials;
        if (n && r) {
          if ("function" == typeof r.get)
            try {
              yield r.get();
            } catch (e) {
              throw (void 0 !== i && this.log(`[TID] Failed to acquire tokens: ${e.message}`), e);
            }
          r.token && t.headers.set("Authorization", "Bearer " + r.token);
        }
        const s = Date.now(),
          a = yield this.fetch(e, t);
        if (void 0 !== i) {
          const n = (Date.now() - s) / 1e3,
            i = new Date(s).toISOString(),
            r = t.body ? t.body.length : 0,
            c = a.headers.get("content-length"),
            d = `${i} [TC HTTP] ${t.method} ${e} ${a.status} ${n} ${o.retryCount} ${r} ${c}`;
          this.log(d);
        }
        if (((o.response = a), a.ok)) return o;
        {
          let e;
          const t = a.headers.get("content-type");
          if (t && -1 !== t.indexOf("application/json")) {
            const t = yield a.json();
            e = new b(a, t.message, t.code || t.errorcode);
          } else {
            const t = yield a.text();
            e = new b(a, t);
          }
          if (!(o.retryCount + 1 < this.maxRetries() && this.retryableError(e))) throw e;
          {
            const e = a.headers.get("retry-after"),
              t = e ? 1e3 * parseInt(e, 10) : 0,
              n = this.calculateRetryDelay(o.retryCount) + t;
            yield delay(n), o.retryCount++;
          }
        }
      }
    });
  }
  fetch(e, t) {
    return fetch(e, t);
  }
  getRange(e) {
    if (e.response.headers.has("Content-Range"))
      try {
        const t = e.response.headers.get("Content-Range").split(" ")[1].split("/"),
          n = t[0].split("-"),
          i = Number(n[0]),
          o = Number(n[1]);
        return { start: i, end: o, total: Number(t[1]) };
      } catch (e) {
        return;
      }
  }
  log(e) {
    return __awaiter$2(this, void 0, void 0, function* () {
      const t = this.config.logger;
      void 0 !== t && ("function" == typeof t.log ? t.log(e) : "function" == typeof t.write && t.write(e + "\n"));
    });
  }
}
class R {
  constructor(e) {
    this.obj = e;
  }
  get origin() {
    return this.obj.origin;
  }
  get isMaster() {
    return this.obj.isMaster;
  }
  get location() {
    return this.obj.location;
  }
  get tcApi() {
    return this.obj["tc-api"];
  }
  get orgApi() {
    return this.obj["org-api"];
  }
  get psetApi() {
    return this.obj["pset-api"];
  }
  get projectsApi() {
    return this.obj["projects-api"];
  }
}
!(function (e) {
  (e[(e.Selected = 1)] = "Selected"),
    (e[(e.Hidden = 4)] = "Hidden"),
    (e[(e.SelectedHidden = 5)] = "SelectedHidden"),
    (e[(e.Visible = 6)] = "Visible"),
    (e[(e.SelectedVisible = 7)] = "SelectedVisible"),
    (e[(e.Highlighted = 8)] = "Highlighted");
})(F || (F = {}));
var __awaiter$1 = function (e, t, n, i) {
  return new (n || (n = Promise))(function (o, r) {
    function fulfilled(e) {
      try {
        step(i.next(e));
      } catch (e) {
        r(e);
      }
    }
    function rejected(e) {
      try {
        step(i.throw(e));
      } catch (e) {
        r(e);
      }
    }
    function step(e) {
      var t;
      e.done
        ? o(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              })).then(fulfilled, rejected);
    }
    step((i = i.apply(e, t || [])).next());
  });
};
const L = {};
class U extends $ {
  static isFile(e) {
    return "FILE" === e.type;
  }
  static isFolder(e) {
    return "FOLDER" === e.type;
  }
  static formatUrlFromOrigin(e, t) {
    return "https:" + e + "/tc/api/2.0/" + t;
  }
  constructor(e) {
    super(Object.assign(Object.assign({}, { serviceUri: "https://app.connect.trimble.com/tc/api/2.0/" }), e));
  }
  search(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = [`query=${t.query}`];
      t.projectId && n.push(`projectId=${t.projectId}`),
        t.type && n.push(`type=${t.type}`),
        t.startDate && n.push(`startDate=${t.startDate}`),
        t.endDate && n.push(`endDate=${t.endDate}`);
      let i = t.sort;
      if (t.sort && t.sort.length) {
        const e = t.sort[0];
        -1 === [" ", "+", "-"].indexOf(e) && (i = " " + i);
      }
      i && n.push(`sort=${i}`);
      const o = U.formatUrlFromOrigin(e, "search?" + n.join("&")),
        r = t.range ? new Headers({ Range: `items=${t.range.start}-${t.range.end}` }) : void 0;
      return yield this.makeRequest(o, "GET", void 0, r);
    });
  }
  listServers() {
    return __awaiter$1(this, void 0, void 0, function* () {
      const e = yield this.makeRequest("regions");
      return (e.data = e.data.map((e) => new R(e))), e;
    });
  }
  getUserDetails(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.makeRequest(`users/${e}`);
    });
  }
  listProjects(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, "projects"),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  getProject(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      if (!e) throw Error("id is required");
      const n = t ? [t] : (yield this.listServers()).data;
      for (const t of n)
        try {
          const n = U.formatUrlFromOrigin(t.origin, `projects/${e}`),
            i = yield this.makeRequest(n);
          if (i) return (i.data.origin = t.origin), i;
        } catch (e) {}
      throw Error("Project with id is not found");
    });
  }
  patchProject(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(t, `projects/${e}`);
      return this.makeRequest(i, "PATCH", JSON.stringify(n));
    });
  }
  updateLastVisitedOnProject(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = {
        lastVisitedOn: (function (e) {
          let t = e.toISOString();
          return (t = t.substr(0, t.indexOf(".")) + "+0000"), t;
        })(new Date()),
      };
      return this.patchProject(e.id, e.origin, t);
    });
  }
  listProjectMembers(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/users`);
      return this.makeRequest(t);
    });
  }
  listProjectFileSystemStructure(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `sync/${e.id}?excludeVersion=true`);
      return this.makeRequest(t);
    });
  }
  createUserGroup(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, "groups");
      return this.makeRequest(n, "POST", JSON.stringify({ name: t, projectId: e.id }));
    });
  }
  removeUserGroup(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `groups/${t}`);
      return this.request(n, "DELETE");
    });
  }
  listUserGroups(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `groups?projectId=${e.id}`);
      return this.makeRequest(t);
    });
  }
  listUsersInGroup(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `groups/${t}/users`);
      return this.makeRequest(n);
    });
  }
  addUsersToGroup(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `groups/${t}/users`),
        o = JSON.stringify(n.map((e) => ({ id: e })));
      return this.makeRequest(i, "POST", o);
    });
  }
  removeUsersFromGroup(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `groups/${t}/users`),
        o = JSON.stringify(n.map((e) => ({ id: e })));
      return this.request(i, "DELETE", o);
    });
  }
  getUserProjectDetails(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e, "projects/me");
      return this.makeRequest(t);
    });
  }
  inviteUserToProject(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/users`);
      return this.makeRequest(i, "POST", JSON.stringify({ email: t, role: n }));
    });
  }
  removeUserFromProject(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/users/${t}`);
      return this.request(n, "DELETE");
    });
  }
  listUsersByCompanyId(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e, `companies/${t}/users`);
      return this.makeRequest(n);
    });
  }
  getProjectSettings(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/settings`);
      return this.makeRequest(t);
    });
  }
  putProjectSettings(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/settings`);
      return this.request(n, "PATCH", JSON.stringify(t));
    });
  }
  listFolderEntries(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = e.rootId || e.id,
        n = U.formatUrlFromOrigin(e.origin, `folders/${t}/items`),
        i = yield this.makeRequest(n);
      for (const t of i.data) t.origin = e.origin;
      return (
        i.data.sort((e, t) =>
          "FOLDER" === e.type && "FILE" === t.type ? -1 : "FILE" === e.type && "FOLDER" === t.type ? 1 : e.name.localeCompare(t.name),
        ),
        i
      );
    });
  }
  getFileStatus(e, t, n, i) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let o = U.formatUrlFromOrigin(e.origin, `files/${t}/status`);
      const r = [];
      return n && r.push(`versionId=${n}`), i && r.push(`format=${i}`), r.length > 0 && (o += "?" + r.join("&")), this.makeRequest(o);
    });
  }
  getProjectSyncStatus(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let n = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/status`);
      return void 0 !== t && (n += `?encode=${t}`), this.makeRequest(n);
    });
  }
  getProjectSyncObjects(e, t, n, i) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let o = U.formatUrlFromOrigin(e.origin, `projects/${e.id}/objects`);
      const r = [`status=${t}`];
      return n && r.push(`types=${n}`), void 0 !== i && r.push(`combineStreams=${i}`), (o += "?" + r.join("&")), this.makeRequest(o);
    });
  }
  getFile(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let i = U.formatUrlFromOrigin(e.origin, `files/${t}`);
      const o = [];
      n && o.push(`versionId=${n}`), o.length > 0 && (i += "?" + o.join("&"));
      const r = yield this.makeRequest(i);
      return (r.data.origin = e.origin), r;
    });
  }
  getFileVersions(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `files/${t}/versions`),
        i = yield this.makeRequest(n);
      return i.data.forEach((t) => (t.origin = e.origin)), i;
    });
  }
  getFileVersionsWithPages(e, t, n, i = 1e3) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = U.formatUrlFromOrigin(e.origin, `files/${t}/versions`);
      yield this.getItemsWithPages(
        o,
        (t) => {
          t.data.forEach((t) => (t.origin = e.origin)), n(t);
        },
        i,
      );
    });
  }
  updateFile(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `files/${t.id}`),
        i = yield this.makeRequest(
          n,
          "PATCH",
          JSON.stringify(t, (e, t) => excludeProperty("id", e, t)),
        );
      return (i.data.origin = e.origin), i;
    });
  }
  getFolder(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `folders/${t}`),
        i = yield this.makeRequest(n);
      return (i.data.origin = e.origin), i;
    });
  }
  getFileDownloadUrl(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let i = U.formatUrlFromOrigin(e.origin, `files/fs/${e.id}/downloadurl`);
      const o = [];
      return t && o.push(`versionId=${t}`), n && o.push(`format=${n}`), o.length > 0 && (i += "?" + o.join("&")), this.makeRequest(i);
    });
  }
  uploadFileContent(e, t, n, i) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = U.formatUrlFromOrigin(e.origin, "files/fs/initiate"),
        r = U.formatUrlFromOrigin(e.origin, "files/fs/commit"),
        s = t.map((e) =>
          __awaiter$1(this, void 0, void 0, function* () {
            const t = JSON.stringify({ parentId: n, parentType: i, name: e.name }),
              s = (yield this.makeRequest(o, "POST", t)).data;
            yield fetch(s.uploadURL, { method: "PUT", body: e });
            return yield this.makeRequest(r, "POST", JSON.stringify({ uploadId: s.uploadId }));
          }),
        ),
        a = yield Promise.all(s);
      return a.forEach((t) => (t.data.origin = e.origin)), a;
    });
  }
  assimilateFile(e, t, n = "TRB") {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `files/${t.id}/process`),
        o = JSON.stringify({ format: n, versionId: t.versionId });
      return this.request(i, "POST", o);
    });
  }
  putPresentationFileContent(e, t, n, i) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = new FormData();
      o.append("file", e, e.name);
      const r = U.formatUrlFromOrigin(t.origin, `files/representation?fileId=${t.id}&versionId=${i || t.versionId}&format=${n}`);
      return this.request(r, "POST", o, new Headers({ "Content-Type": "multipart/form-data" }));
    });
  }
  getImage(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let n = t;
      const i = t.startsWith("/tc/static/") || t.startsWith("/tc/ng-static/") || t.startsWith("/assets/img/");
      if ((t.startsWith("/") && (n = ((!i && e && "https:" + e.origin) || extractEndpoint(this.config.serviceUri)) + t), n in L)) return L[n];
      if (i) return (L[n] = n);
      {
        const e = yield this.request(n),
          t = yield e.response.blob();
        return (L[n] = URL.createObjectURL(t));
      }
    });
  }
  getPlacement(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `files/${e.id}/alignment`);
      if (t)
        try {
          const e = yield this.makeRequest(`${n}?versionId=${t}`, "GET");
          if (null == e ? void 0 : e.data) return e;
        } catch (e) {}
      return this.makeRequest(n, "GET");
    });
  }
  putPlacement(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let i = "";
      n && (i = `?versionId=${n}`);
      const o = U.formatUrlFromOrigin(e.origin, `files/${e.id}/alignment${i}`);
      return this.makeRequest(o, "PUT", JSON.stringify(t));
    });
  }
  listToDos(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `todos?projectId=${e.id}`),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  getToDo(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `todos/${t}`),
        i = yield this.makeRequest(n);
      if (((i.data.origin = e.origin), i.data.projectId !== e.id)) throw new Error("Item belongs to other project");
      return i;
    });
  }
  createToDo(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, "todos"),
        i = yield this.makeRequest(n, "POST", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  updateToDo(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `todos/${t.id}`),
        i = yield this.makeRequest(n, "PATCH", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  removeToDo(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `todos/${t}`);
      return this.request(n, "DELETE");
    });
  }
  listToDoComments(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `comments?projectId=${e.projectId}&objectId=${e.id}&objectType=TODO`),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  listComments(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `comments?projectId=${e.id}&objectId=${t}&objectType=${n}`),
        o = yield this.makeRequest(i);
      for (const t of o.data) t.origin = e.origin;
      return o;
    });
  }
  listAttachments(e, t, n, i) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = "TODO" === i ? "todos" : "comments",
        r = U.formatUrlFromOrigin(e, `${o}/${n}/attachments?projectId=${t}`),
        s = yield this.makeRequest(r);
      for (const t of s.data) t.origin = e;
      return s;
    });
  }
  listToDoAttachments(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      return this.listAttachments(e.origin, e.projectId, e.id, "TODO");
    });
  }
  addAttachmentsToEntity(e, t, n, i) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = "TODO" === n.type ? "todos" : "comments",
        r = U.formatUrlFromOrigin(e, `${o}/${n.id}/attachments?projectId=${t}`),
        s = [];
      i.forEach((e) => {
        const t = "URL" === e.type ? { type: e.type, url: e.id, urlName: e.urlName || "" } : { type: e.type, id: e.id, embedded: e.embedded || !1 };
        s.push(t);
      });
      const a = JSON.stringify(s),
        c = yield this.makeRequest(r, "POST", a);
      return (c.data.origin = e), c;
    });
  }
  attachViewToTodo(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `todos/${e.id}/attachments?projectId=${e.projectId}`),
        i = yield this.makeRequest(n, "POST", JSON.stringify([{ type: "VIEW", id: t.id }]));
      return (i.data.origin = e.origin), i;
    });
  }
  removeAttachment(e, t, n, i, o, r) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const s = "TODO" === i ? "todos" : "comments",
        a = U.formatUrlFromOrigin(e, `${s}/${n}/attachments?projectId=${t}`);
      return this.request(a, "DELETE", JSON.stringify([{ id: o, type: r }]));
    });
  }
  createComment(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, "comments"),
        i = yield this.makeRequest(n, "POST", JSON.stringify(t));
      return (i.data.origin = e.origin), i;
    });
  }
  updateComment(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `comments/${e.id}`),
        n = yield this.makeRequest(t, "PATCH", JSON.stringify({ description: e.description }));
      return (n.data.origin = e.origin), n;
    });
  }
  deleteComment(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `comments/${t}`);
      return this.request(n, "DELETE");
    });
  }
  list2DViews(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `views2d?projectId=${e.id}`),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  get2DView(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `views2d/${t}`),
        i = yield this.makeRequest(n);
      if (((i.data.origin = e.origin), i.data.projectId !== e.id)) throw new Error("Item belongs to different project");
      return i;
    });
  }
  create2DView(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      "" === t.description && (t.description = void 0);
      const n = U.formatUrlFromOrigin(e.origin, "views2d"),
        i = yield this.makeRequest(n, "POST", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  update2DView(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `views2d/${t.id}`),
        i = yield this.makeRequest(n, "PATCH", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  remove2DView(e, t, n = !1) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `views2d/${t}?force=${n}`);
      return this.request(i, "DELETE");
    });
  }
  listViews(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `views?projectId=${e.id}`),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  getView(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `views/${t}`),
        i = yield this.makeRequest(n);
      if (((i.data.origin = e.origin), i.data.projectId !== e.id)) throw new Error("Item belongs to different project");
      return i;
    });
  }
  createView(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      "" === t.description && (t.description = void 0);
      const n = U.formatUrlFromOrigin(e.origin, "views"),
        i = yield this.makeRequest(n, "POST", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  updateView(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `views/${t.id}`),
        i = yield this.makeRequest(n, "PATCH", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  removeView(e, t, n = !1) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `views/${t}?force=${n}`);
      return this.request(i, "DELETE");
    });
  }
  createViewGroup(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, "viewgroups"),
        o = yield this.makeRequest(i, "POST", JSON.stringify({ projectId: e.id, name: t, views: n }));
      return (o.data.origin = e.origin), o;
    });
  }
  removeViewGroup(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `viewgroups/${t}`);
      return this.request(n, "DELETE");
    });
  }
  updateViewGroup(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `viewgroups/${t.id}`),
        i = yield this.makeRequest(n, "PATCH", JSON.stringify({ name: t.name, views: t.views }));
      return (i.data.origin = e.origin), i;
    });
  }
  listViewGroups(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `viewgroups?projectId=${e.id}`),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  listTags(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `tags?projectId=${e.id}`),
        n = yield this.makeRequest(t);
      for (const t of n.data) t.origin = e.origin;
      return n;
    });
  }
  createTag(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, "tags"),
        i = yield this.makeRequest(n, "POST", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  addObjectToTag(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `tags/${e.id}/objects`);
      return this.request(i, "POST", JSON.stringify([{ id: t, objectType: n }]));
    });
  }
  removeObjectFromTag(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `tags/${e.id}/objects`);
      return this.request(i, "DELETE", JSON.stringify([{ id: t, objectType: n }]));
    });
  }
  listTagsInObject(e, t, n) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const i = U.formatUrlFromOrigin(e.origin, `tags?objectId=${t}&objectType=${n}&projectId=${e.id}`),
        o = yield this.makeRequest(i);
      for (const t of o.data) t.origin = e.origin;
      return o;
    });
  }
  getLinksByFile(e, t, n, i = !1, o = !1) {
    return __awaiter$1(this, void 0, void 0, function* () {
      let r = `objectlink?id=${t}`;
      (r += void 0 !== n ? `&versionId=${n}` : ""), (r += `&includeDeleted=${i}`), (r += `&full=${o}&detail=${o}`);
      const s = U.formatUrlFromOrigin(e.origin, r);
      return this.makeRequest(s, "GET");
    });
  }
  getLinksByEntity(e, t, n, i = !1) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = "URL" === n ? encodeURIComponent(t) : t,
        r = U.formatUrlFromOrigin(e.origin, `objectlink/target?projectId=${e.id}&type=${n}&id=${o}&includeDeleted=${i}`);
      return this.makeRequest(r);
    });
  }
  createObjectLink(e, t, n, i, o, r, s) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const a = i.map((e) => ({ sourceId: e, type: "BIMOBJECT" })),
        c = { source: { id: t, versionId: n, data: a }, target: { id: o, type: r } };
      "URL" === r && (c.name = s);
      const d = U.formatUrlFromOrigin(e.origin, "objectlink");
      return this.makeRequest(d, "POST", JSON.stringify(c));
    });
  }
  updateObjectLink(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `objectlink/${t.id}`);
      return this.makeRequest(n, "PATCH", JSON.stringify(t));
    });
  }
  deleteObjectLink(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `objectlink/${t}`);
      return this.request(n, "DELETE");
    });
  }
  listClashSets(e) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const t = U.formatUrlFromOrigin(e.origin, `clashsets?projectId=${e.id}`),
        n = yield this.makeRequest(t);
      return n.data.forEach((t) => (t.origin = e.origin)), n;
    });
  }
  getClashSetDetails(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `clashsets/${t}`),
        i = yield this.makeRequest(n);
      return (i.data.origin = e.origin), i;
    });
  }
  createClashSet(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, "clashsets"),
        i = yield this.makeRequest(n, "POST", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  updateClashSet(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `clashsets/${t.id}`),
        i = yield this.makeRequest(n, "PATCH", JSON.stringify(t, excludeOrigin));
      return (i.data.origin = e.origin), i;
    });
  }
  deleteClashSet(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `clashsets/${t}`);
      return this.request(n, "DELETE");
    });
  }
  getClashItems(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e.origin, `clashsets/${t}/items`),
        i = yield this.makeRequest(n);
      return i.data.forEach((t) => (t.origin = e.origin)), i;
    });
  }
  getClashItemsWithPages(e, t, n, i = 1e3) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const o = U.formatUrlFromOrigin(e.origin, `clashsets/${t}/items`);
      yield this.getItemsWithPages(
        o,
        (t) => {
          t.data.forEach((t) => (t.origin = e.origin)), n(t);
        },
        i,
      );
    });
  }
  getShare(e, t) {
    return __awaiter$1(this, void 0, void 0, function* () {
      const n = U.formatUrlFromOrigin(e, `shares/token/${t}`),
        i = yield this.makeRequest(n);
      return (i.data.origin = e), i;
    });
  }
}
function excludeOrigin(e, t) {
  return excludeProperty("origin", e, t);
}
function excludeProperty(e, t, n) {
  return t === e ? void 0 : n;
}
new U();
var __awaiter = function (e, t, n, i) {
  return new (n || (n = Promise))(function (o, r) {
    function fulfilled(e) {
      try {
        step(i.next(e));
      } catch (e) {
        r(e);
      }
    }
    function rejected(e) {
      try {
        step(i.throw(e));
      } catch (e) {
        r(e);
      }
    }
    function step(e) {
      var t;
      e.done
        ? o(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              })).then(fulfilled, rejected);
    }
    step((i = i.apply(e, t || [])).next());
  });
};
new (class extends $ {
  constructor(e) {
    super(Object.assign(Object.assign({}, { serviceUri: "https://user.connect.trimble.com/v1/" }), e));
  }
  createUserProperty(e) {
    return __awaiter(this, void 0, void 0, function* () {
      const t = `users/${e.tidUuid}/properties`;
      return this.makeRequest(t, "POST", JSON.stringify(e));
    });
  }
  getUserProperty(e, t) {
    return __awaiter(this, void 0, void 0, function* () {
      const n = `users/${t}/properties/${e}`;
      return this.makeRequest(n);
    });
  }
  updateUserProperty(e) {
    return __awaiter(this, void 0, void 0, function* () {
      const t = `users/${e.tidUuid}/properties/${e.key}`;
      return this.makeRequest(t, "PUT", JSON.stringify(e));
    });
  }
  deleteUserProperty(e, t) {
    return __awaiter(this, void 0, void 0, function* () {
      const n = `users/${t}/properties/${e}`;
      return this.makeRequest(n, "DELETE");
    });
  }
})();
var q,
  D = { exports: {} },
  A = "object" == typeof Reflect ? Reflect : null,
  N =
    A && "function" == typeof A.apply
      ? A.apply
      : function (e, t, n) {
          return Function.prototype.apply.call(e, t, n);
        };
q =
  A && "function" == typeof A.ownKeys
    ? A.ownKeys
    : Object.getOwnPropertySymbols
    ? function (e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
      }
    : function (e) {
        return Object.getOwnPropertyNames(e);
      };
var _ =
  Number.isNaN ||
  function (e) {
    return e != e;
  };
function EventEmitter() {
  EventEmitter.init.call(this);
}
(D.exports = EventEmitter),
  (D.exports.once = function (e, t) {
    return new Promise(function (n, i) {
      function errorListener(n) {
        e.removeListener(t, resolver), i(n);
      }
      function resolver() {
        "function" == typeof e.removeListener && e.removeListener("error", errorListener), n([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(e, t, resolver, { once: !0 }),
        "error" !== t &&
          (function (e, t, n) {
            "function" == typeof e.on && eventTargetAgnosticAddListener(e, "error", t, n);
          })(e, errorListener, { once: !0 });
    });
  }),
  (EventEmitter.EventEmitter = EventEmitter),
  (EventEmitter.prototype._events = void 0),
  (EventEmitter.prototype._eventsCount = 0),
  (EventEmitter.prototype._maxListeners = void 0);
var z = 10;
function checkListener(e) {
  if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
function _getMaxListeners(e) {
  return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners;
}
function _addListener(e, t, n, i) {
  var o, r, s, a;
  if (
    (checkListener(n),
    void 0 === (r = e._events)
      ? ((r = e._events = Object.create(null)), (e._eventsCount = 0))
      : (void 0 !== r.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), (r = e._events)), (s = r[t])),
    void 0 === s)
  )
    (s = r[t] = n), ++e._eventsCount;
  else if (
    ("function" == typeof s ? (s = r[t] = i ? [n, s] : [s, n]) : i ? s.unshift(n) : s.push(n),
    (o = _getMaxListeners(e)) > 0 && s.length > o && !s.warned)
  ) {
    s.warned = !0;
    var c = new Error(
      "Possible EventEmitter memory leak detected. " +
        s.length +
        " " +
        String(t) +
        " listeners added. Use emitter.setMaxListeners() to increase limit",
    );
    (c.name = "MaxListenersExceededWarning"),
      (c.emitter = e),
      (c.type = t),
      (c.count = s.length),
      (a = c),
      console && console.warn && console.warn(a);
  }
  return e;
}
function onceWrapper() {
  if (!this.fired)
    return (
      this.target.removeListener(this.type, this.wrapFn),
      (this.fired = !0),
      0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
    );
}
function _onceWrap(e, t, n) {
  var i = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n },
    o = onceWrapper.bind(i);
  return (o.listener = n), (i.wrapFn = o), o;
}
function _listeners(e, t, n) {
  var i = e._events;
  if (void 0 === i) return [];
  var o = i[t];
  return void 0 === o
    ? []
    : "function" == typeof o
    ? n
      ? [o.listener || o]
      : [o]
    : n
    ? (function (e) {
        for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
        return t;
      })(o)
    : arrayClone(o, o.length);
}
function listenerCount(e) {
  var t = this._events;
  if (void 0 !== t) {
    var n = t[e];
    if ("function" == typeof n) return 1;
    if (void 0 !== n) return n.length;
  }
  return 0;
}
function arrayClone(e, t) {
  for (var n = new Array(t), i = 0; i < t; ++i) n[i] = e[i];
  return n;
}
function eventTargetAgnosticAddListener(e, t, n, i) {
  if ("function" == typeof e.on) i.once ? e.once(t, n) : e.on(t, n);
  else {
    if ("function" != typeof e.addEventListener)
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    e.addEventListener(t, function wrapListener(o) {
      i.once && e.removeEventListener(t, wrapListener), n(o);
    });
  }
}
let X, Y, Z;
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return z;
  },
  set: function (e) {
    if ("number" != typeof e || e < 0 || _(e))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    z = e;
  },
}),
  (EventEmitter.init = function () {
    (void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events) ||
      ((this._events = Object.create(null)), (this._eventsCount = 0)),
      (this._maxListeners = this._maxListeners || void 0);
  }),
  (EventEmitter.prototype.setMaxListeners = function (e) {
    if ("number" != typeof e || e < 0 || _(e))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
    return (this._maxListeners = e), this;
  }),
  (EventEmitter.prototype.getMaxListeners = function () {
    return _getMaxListeners(this);
  }),
  (EventEmitter.prototype.emit = function (e) {
    for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
    var i = "error" === e,
      o = this._events;
    if (void 0 !== o) i = i && void 0 === o.error;
    else if (!i) return !1;
    if (i) {
      var r;
      if ((t.length > 0 && (r = t[0]), r instanceof Error)) throw r;
      var s = new Error("Unhandled error." + (r ? " (" + r.message + ")" : ""));
      throw ((s.context = r), s);
    }
    var a = o[e];
    if (void 0 === a) return !1;
    if ("function" == typeof a) N(a, this, t);
    else {
      var c = a.length,
        d = arrayClone(a, c);
      for (n = 0; n < c; ++n) N(d[n], this, t);
    }
    return !0;
  }),
  (EventEmitter.prototype.addListener = function (e, t) {
    return _addListener(this, e, t, !1);
  }),
  (EventEmitter.prototype.on = EventEmitter.prototype.addListener),
  (EventEmitter.prototype.prependListener = function (e, t) {
    return _addListener(this, e, t, !0);
  }),
  (EventEmitter.prototype.once = function (e, t) {
    return checkListener(t), this.on(e, _onceWrap(this, e, t)), this;
  }),
  (EventEmitter.prototype.prependOnceListener = function (e, t) {
    return checkListener(t), this.prependListener(e, _onceWrap(this, e, t)), this;
  }),
  (EventEmitter.prototype.removeListener = function (e, t) {
    var n, i, o, r, s;
    if ((checkListener(t), void 0 === (i = this._events))) return this;
    if (void 0 === (n = i[e])) return this;
    if (n === t || n.listener === t)
      0 == --this._eventsCount
        ? (this._events = Object.create(null))
        : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t));
    else if ("function" != typeof n) {
      for (o = -1, r = n.length - 1; r >= 0; r--)
        if (n[r] === t || n[r].listener === t) {
          (s = n[r].listener), (o = r);
          break;
        }
      if (o < 0) return this;
      0 === o
        ? n.shift()
        : (function (e, t) {
            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
            e.pop();
          })(n, o),
        1 === n.length && (i[e] = n[0]),
        void 0 !== i.removeListener && this.emit("removeListener", e, s || t);
    }
    return this;
  }),
  (EventEmitter.prototype.off = EventEmitter.prototype.removeListener),
  (EventEmitter.prototype.removeAllListeners = function (e) {
    var t, n, i;
    if (void 0 === (n = this._events)) return this;
    if (void 0 === n.removeListener)
      return (
        0 === arguments.length
          ? ((this._events = Object.create(null)), (this._eventsCount = 0))
          : void 0 !== n[e] && (0 == --this._eventsCount ? (this._events = Object.create(null)) : delete n[e]),
        this
      );
    if (0 === arguments.length) {
      var o,
        r = Object.keys(n);
      for (i = 0; i < r.length; ++i) "removeListener" !== (o = r[i]) && this.removeAllListeners(o);
      return this.removeAllListeners("removeListener"), (this._events = Object.create(null)), (this._eventsCount = 0), this;
    }
    if ("function" == typeof (t = n[e])) this.removeListener(e, t);
    else if (void 0 !== t) for (i = t.length - 1; i >= 0; i--) this.removeListener(e, t[i]);
    return this;
  }),
  (EventEmitter.prototype.listeners = function (e) {
    return _listeners(this, e, !0);
  }),
  (EventEmitter.prototype.rawListeners = function (e) {
    return _listeners(this, e, !1);
  }),
  (EventEmitter.listenerCount = function (e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : listenerCount.call(e, t);
  }),
  (EventEmitter.prototype.listenerCount = listenerCount),
  (EventEmitter.prototype.eventNames = function () {
    return this._eventsCount > 0 ? q(this._events) : [];
  });
const H = new w(),
  G = new D.exports.EventEmitter();
var J;
function configure(e, t, n) {
  (X = e),
    (Y = t),
    (Z = n),
    X.addEventListener("pick", (e) => {
      if (e.detail.modelId === h.ModelId)
        for (const t of X.plugins.get(y).getIcons())
          if (t.id === e.detail.id) {
            emit(J.IconPick, { icon: t, detail: e.detail });
            break;
          }
      emit(J.ObjectPick, e.detail);
    });
}
function on(e, t) {
  G.on(e, t);
}
function removeEventListener(e, t) {
  G.removeListener(e, t);
}
function emit(e, t) {
  G.emit(e, t, !1);
}
function getTrimbimModel(e) {
  return X.getModel(e, a);
}
function createCameraData() {
  return {
    position: X.camera.position,
    quaternion: X.camera.quaternion,
    rotation: quaternionToRotation(X.camera.quaternion),
    direction: X.camera.direction,
    projectionType: X.camera.projectionType,
    fieldOfView: X.camera.fieldOfView,
    orthoSize: X.camera.orthoSize,
  };
}
function rotationToQuaternion(n) {
  let i = n.yaw;
  Math.abs(n.pitch - Math.PI) < 0.001 && (i += Math.PI);
  const o = new e().set(n.pitch, 0, i, "YZX");
  return new t().setFromEuler(o);
}
function quaternionToRotation(e) {
  const t = new n(0, 0, -1).applyQuaternion(e),
    i = Math.PI - Math.atan2(Math.sqrt(t.x * t.x + t.y * t.y), t.z);
  Math.abs(t.z) > 0.9999 && t.set(0, 1, 0).applyQuaternion(e);
  return { pitch: i, yaw: -Math.atan2(t.x, t.y) };
}
function isBackgroundImage360() {
  return X.isCubeBackground();
}
async function getEntityIds(e, t, n) {
  t = t.filter((e) => void 0 !== e);
  const i = [];
  if (n)
    for (const e of t) {
      const t = n.tryGetEntityFromPersistentIdentifier(e);
      if (void 0 !== t) i.push(t);
      else {
        const t = n.tryGetEntityFromNonPersistentIdentifier(e);
        if (t.length)
          if (t.length > 1) {
            const n = t.filter((e) => i.indexOf(e) < 0);
            i.push((n.length ? n : t)[0]), logDebug(`Multiple entityIds [${t.join(", ")}] were found for identifier: '${e}'.`);
          } else i.push(t[0]);
        else i.push(void 0), logWarning(`No entityId has been found for identifier: '${e}'.`);
      }
    }
  else e && i.push(...(await e.guidsToEntityIds(t)));
  return Promise.resolve(i);
}
async function getPersistentIds(e, t) {
  return Array.from(
    (
      await (async function (e, t) {
        const n = new Map(),
          i = [],
          o = getTrimbimModel(e);
        if (o) {
          let r = [],
            s = [];
          try {
            r = await o.getEntities(t);
            getTrimbimModel(e) && (s = await o.getBoundingBoxesForConnectIdentifier(t));
          } catch (e) {
            logError(e);
          }
          for (let e = 0; e < r.length; e++) {
            const t = r[e];
            try {
              let i = H.tryGetPersistentIdentifier(t);
              void 0 === i && (i = H.tryGetNonPersistentIdentifier(t, s[e])), n.set(t, i);
            } catch (e) {
              n.set(t, ""), i.push(t.id.toString());
            }
          }
          i.length && logError(`Unable to get persistent or non-persistent identifier for the following entitiIds: ${i.join(", ")}`);
        }
        return Promise.resolve(n);
      })(e, t)
    ).values(),
  );
}
async function getPartIdsFromAssemblyIds(e, t) {
  const n = getTrimbimModel(e);
  return n ? await n.getHierarchyChildren(t, !0) : [];
}
async function getGrids$1(e) {
  return await e.findEntitiesByClass("IFCGRID");
}
!(function (e) {
  (e.ActivateGhostMode = "ActivateGhostMode"),
    (e.EnableAnnotations = "EnableAnnotations"),
    (e.EnableClipPlanes = "EnableClipPlanes"),
    (e.EnableGrids = "EnableGrids"),
    (e.EnableObjectLinks = "EnableObjectLinks"),
    (e.IconPick = "IconPick"),
    (e.ObjectPick = "ObjectPick");
})(J || (J = {}));
function convertConnectAlignmentToViewerPlacement(e) {
  const t = convertConnectPointToViewerPoint(e.locationX, e.locationY, e.locationZ),
    n = normalize(vector3(e.axisX, e.axisY, e.axisZ)),
    i = normalize(cross(n, vector3(e.refDirectionX, e.refDirectionY, e.refDirectionZ))),
    o = normalize(cross(i, n)),
    r = e.scale;
  return (function (e, t, n, i) {
    return { elements: [e.x, e.y, e.z, 0, t.x, t.y, t.z, 0, n.x, n.y, n.z, 0, i.x, i.y, i.z, 1] };
  })(scale(o, r), scale(i, r), scale(n, r), t);
}
function addConnectCloudMarkupToViewer(e) {
  X.tools.get(d).add(
    {
      point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ),
      normal: convertConnectDirectionToViewerDirection(e.planeA, e.planeB, e.planeC),
    },
    e.width / 1e3 / 2,
    e.height / 1e3 / 2,
    convertConnectColorToViewerColor(e.color),
  );
}
function addCloudMarkupToViewer(e) {
  return X.tools
    .get(d)
    .add(
      { point: convertConnectPointToViewerPoint(e.position.x, e.position.y, e.position.z), normal: new n(e.normal.x, e.normal.y, e.normal.z) },
      e.width,
      e.height,
      convertConnectColorToViewerColor(e.color),
    );
}
function convertConnectSectionPlaneToViewerClipPlane(e) {
  return {
    normal: convertConnectDirectionToViewerDirection(e.directionX, e.directionY, e.directionZ),
    position: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ),
  };
}
function addConnectLineMarkupToViewer(e) {
  return X.tools
    .get(u)
    .add(
      { point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ) },
      { point: convertConnectPointToViewerPoint(e.position2X, e.position2Y, e.position2Z) },
      convertConnectColorToViewerColor(e.color),
    );
}
function addConnectArrowMarkupToViewer(e) {
  return X.tools
    .get(l)
    .add(
      { point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ) },
      { point: convertConnectPointToViewerPoint(e.position2X, e.position2Y, e.position2Z) },
      convertConnectColorToViewerColor(e.color),
    );
}
function addTextMarkupToViewer(e) {
  return X.tools
    .get(p)
    .add(
      { point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ) },
      { point: convertConnectPointToViewerPoint(e.position2X, e.position2Y, e.position2Z) },
      convertConnectColorToViewerColor(e.color),
      e.text,
    );
}
function addConnectTextMarkupToViewer(e) {
  X.tools
    .get(p)
    .add(
      { point: convertConnectPointToViewerPoint(e.position2X, e.position2Y, e.position2Z) },
      { point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ) },
      convertConnectColorToViewerColor(e.color),
      e.text,
    );
}
function addConnectFreelineMarkupToViewer(e) {
  const t = [];
  for (const n of e.lines)
    t.push(convertConnectPointToViewerPoint(n.positionX, n.positionY, n.positionZ)),
      t.push(convertConnectPointToViewerPoint(n.position2X, n.position2Y, n.position2Z));
  X.tools.get(f).add(t, convertConnectColorToViewerColor(e.color));
}
function addConnectSinglePointMeasurementToViewer(e) {
  X.tools.get(m).add({ point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ) }, convertConnectColorToViewerColor(e.color));
}
function convertConnectPick(e, t) {
  switch (e.type) {
    case "line":
    case "lineSegment":
      return {
        snapType: 1,
        point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ),
        snapLineStart: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ),
        snapLineEnd: convertConnectPointToViewerPoint(e.position2X, e.position2Y, e.position2Z),
      };
    case "point":
      return {
        id: t[e.referenceObject] ? t[e.referenceObject].objectRuntimeId : void 0,
        model: t[e.referenceObject] ? getTrimbimModel(t[e.referenceObject].modelVersionId) : void 0,
        snapType: 2,
        point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ),
      };
    case "plane":
      return {
        snapType: 0,
        point: convertConnectPointToViewerPoint(e.positionX, e.positionY, e.positionZ),
        normal: convertConnectDirectionToViewerDirection(e.directionX, e.directionY, e.directionZ),
      };
    default:
      return null;
  }
}
function addConnectMeasurementMarkupToViewer(e, t) {
  let i = convertConnectPick(e.start, t),
    r = convertConnectPick(e.end, t);
  if (0 === i.snapType) {
    const e = i;
    (i = r), (r = e), 1 === r.snapType && i.point.copy(i.snapLineStart).add(i.snapLineEnd).multiplyScalar(0.5);
  }
  if (1 === i.snapType && 1 === r.snapType) {
    const e = i;
    (i = r), (r = e);
    const t = i.snapLineEnd.clone().sub(i.snapLineStart),
      s = r.snapLineEnd.clone().sub(r.snapLineStart),
      a = t.dot(s);
    if (Math.abs(a) < 0.999) {
      const e = new o(r.snapLineStart, r.snapLineEnd).closestPointToPoint(i.point, !1, new n());
      (i = { snapType: 2, point: i.point.clone() }), (r = { snapType: 2, point: e });
    }
  }
  if (1 === i.snapType && 2 === r.snapType) {
    const e = i;
    (i = r), (r = e);
  }
  return X.tools.get(g).add(i, r, convertConnectColorToViewerColor(e.color));
}
function addConnectAngleMeasurementToViewer(e, t) {
  let n, i, o;
  return (
    isNaN(e.positionX) || isNaN(e.positionY) || isNaN(e.positionZ)
      ? ((n = convertConnectPick(e.start, t)), (i = convertConnectPick(e.end, t)))
      : ((n = convertConnectPick(
          { type: "point", positionX: e.positionX, positionY: e.positionY, positionZ: e.positionZ, referenceObject: e.referenceObject },
          t,
        )),
        (o = convertConnectPick(e.start, t)),
        (i = convertConnectPick(e.end, t))),
    X.tools.get(v).add(n, i, o, convertConnectColorToViewerColor(e.color))
  );
}
function convertConnectCameraToViewerCamera(e) {
  const t = new n(Math.sin(e.pitch) * Math.sin(e.yaw), -Math.sin(e.pitch) * Math.cos(e.yaw), Math.cos(e.pitch));
  return convertConnectCameraDetailsToViewerCamera(
    new n(e.targetX + e.distance * t.x, e.targetY + e.distance * t.y, e.targetZ + e.distance * t.z),
    void 0,
    { pitch: e.pitch, yaw: e.yaw },
    e.projectionType,
    e.viewAngle,
    e.viewScale,
  );
}
function getCameraUpDirection(e) {
  if (e && e.quaternion) {
    const t = new r();
    t.makeRotationFromQuaternion(e.quaternion);
    const i = new n(),
      o = new n(),
      s = new n();
    return t.extractBasis(i, o, s), o;
  }
}
function convertConnectCameraDetailsToViewerCamera(n, i, o, r, s, a) {
  return {
    position: n && convertConnectPointToViewerPoint(n.x, n.y, n.z),
    quaternion: i ? i.clone().multiply(new t().setFromEuler(new e(0, Math.PI, 0))) : void 0,
    rotation: o,
    direction: void 0,
    projectionType: r,
    fieldOfView: s,
    orthoSize: a,
  };
}
function convertConnectDirectionToViewerDirection(e, t, i) {
  return new n(-e, -t, -i);
}
function convertConnectPointToViewerPoint(e, t, i) {
  return new n(e / 1e3, t / 1e3, i / 1e3);
}
function convertConnectColorToViewerColor(e) {
  return void 0 !== e.r ? new i(e.r / 255, e.g / 255, e.b / 255) : void 0;
}
function convertViewerColorToConnectColor(e) {
  return { r: 255 * e.r, g: 255 * e.g, b: 255 * e.b, a: 255 };
}
function convertViewerTextMarkupToConnectMarkup(e) {
  let t = ((n = e.text), new DOMParser().parseFromString(n, "text/html").body.textContent || "").trim();
  var n;
  if ("" === t) return null;
  t.length > 250 && (t = t.substring(0, 250));
  const { x: i, y: o, z: r } = convertViewerPointToConnectPoint(e.endPick.point),
    { x: s, y: a, z: c } = convertViewerPointToConnectPoint(e.startPick.point);
  return {
    type: "text",
    positionX: i,
    positionY: o,
    positionZ: r,
    position2X: s,
    position2Y: a,
    position2Z: c,
    color: convertViewerColorToConnectColor(e.color),
    text: t,
    screenSpaceDistance: 0,
    width: 0,
  };
}
function convertViewerMaterialToConnectColor(e) {
  var t;
  if (e) {
    if (e.color) return { r: 255 * e.color.r, g: 255 * e.color.g, b: 255 * e.color.b, a: 255 * (null !== (t = e.opacity) && void 0 !== t ? t : 1) };
    if (void 0 !== e.opacity) return { a: 255 * e.opacity };
  }
}
function convertViewerLineMarkupToConnectMarkup(e) {
  const { x: t, y: n, z: i } = convertViewerPointToConnectPoint(e.startPick.point),
    { x: o, y: r, z: s } = convertViewerPointToConnectPoint(e.endPick.point);
  return {
    type: "line",
    positionX: t,
    positionY: n,
    positionZ: i,
    position2X: o,
    position2Y: r,
    position2Z: s,
    color: convertViewerColorToConnectColor(e.color),
  };
}
function convertViewerArrowMarkupToConnectMarkup(e) {
  const { x: t, y: n, z: i } = convertViewerPointToConnectPoint(e.startPick.point),
    { x: o, y: r, z: s } = convertViewerPointToConnectPoint(e.endPick.point);
  return {
    type: "arrow",
    positionX: t,
    positionY: n,
    positionZ: i,
    position2X: o,
    position2Y: r,
    position2Z: s,
    color: convertViewerColorToConnectColor(e.color),
  };
}
function convertViewerCloudMarkupToConnectMarkup(e) {
  const { x: t, y: n, z: i } = convertViewerPointToConnectPoint(e.position),
    { x: o, y: r, z: s } = convertViewerDirectionToConnectDirection(e.normal);
  return {
    type: "cloud",
    positionX: t,
    positionY: n,
    positionZ: i,
    planeA: o,
    planeB: r,
    planeC: s,
    planeD: dot(e.normal, e.position),
    width: 1e3 * e.width * 2,
    height: 1e3 * e.height * 2,
    color: convertViewerColorToConnectColor(e.color),
  };
}
function convertViewerFreelineMarkupToConnectMarkup(e, t) {
  const n = [];
  for (let t = 0; t < e.points.length - 1; t++) {
    const { x: i, y: o, z: r } = convertViewerPointToConnectPoint(e.points[t].clone().applyMatrix4(e.matrixWorld)),
      { x: s, y: a, z: c } = convertViewerPointToConnectPoint(e.points[t + 1].clone().applyMatrix4(e.matrixWorld));
    n.push({ positionX: i, positionY: o, positionZ: r, position2X: s, position2Y: a, position2Z: c });
  }
  return { type: "redlines", camera: t, lines: n, color: convertViewerColorToConnectColor(e.color) };
}
function convertViewerPointMarkupToConnectMarkup(e) {
  const { x: t, y: n, z: i } = convertViewerPointToConnectPoint(e.position);
  return {
    type: "measure",
    positionX: t,
    positionY: n,
    positionZ: i,
    position2X: t,
    position2Y: n,
    position2Z: i,
    color: convertViewerColorToConnectColor(e.color),
  };
}
function convertViewerPick(e, t) {
  if (!e) return null;
  switch (e.snapType) {
    case 2: {
      const { x: n, y: i, z: o } = convertViewerPointToConnectPoint(e.point);
      return { type: "point", referenceObject: e.model && e.id ? t[e.model.modelId][e.id] : void 0, positionX: n, positionY: i, positionZ: o };
    }
    case 1: {
      const { x: n, y: i, z: o } = convertViewerPointToConnectPoint(e.point),
        { x: r, y: s, z: a } = convertViewerPointToConnectPoint(e.snapLineEnd);
      return {
        type: "lineSegment",
        referenceObject: e.model && e.id ? t[e.model.modelId][e.id] : void 0,
        positionX: n,
        positionY: i,
        positionZ: o,
        position2X: r,
        position2Y: s,
        position2Z: a,
      };
    }
    case 0: {
      const { x: n, y: i, z: o } = convertViewerPointToConnectPoint(e.point),
        { x: r, y: s, z: a } = convertViewerDirectionToConnectDirection(e.normal);
      return {
        type: "plane",
        referenceObject: e.model && e.id ? t[e.model.modelId][e.id] : void 0,
        positionX: n,
        positionY: i,
        positionZ: o,
        directionX: r,
        directionY: s,
        directionZ: a,
      };
    }
    default:
      return null;
  }
}
function convertViewerMeasurementToConnectMarkup(e) {
  const t = 0 !== e.axisIndex || 0 !== e.directionIndex,
    n = 0 === e.startPick.snapType,
    i = 1 === e.startPick.snapType && 1 === e.endPick.snapType,
    o = 1 === e.startPick.snapType && 2 === e.endPick.snapType,
    r = t || n || i || o;
  let s = r ? { snapType: 2, point: e.getMainLine().start.clone(), model: e.startPick.model, id: e.startPick.id } : e.startPick,
    a = r ? { snapType: 2, point: e.getMainLine().end.clone(), model: e.endPick.model, id: e.endPick.id } : e.endPick;
  if (0 === s.snapType && 0 === a.snapType) {
    const e = s;
    (s = a), (a = e);
  }
  return new Promise((t) => {
    getObjectRuntimeIdToPersistentIdMap(e).then((n) => {
      t({
        type: "measure_with_pick",
        unitType: "Metric",
        quantityUnit: "millimeter",
        quantityUnitFormat: "mm",
        start: convertViewerPick(s, n),
        end: convertViewerPick(a, n),
        color: convertViewerColorToConnectColor(e.color),
      });
    });
  });
}
function convertViewerAngleMeasurementToConnectMarkup(e) {
  return new Promise((t) => {
    getObjectRuntimeIdToPersistentIdMap(e).then((n) => {
      let i = {
        type: "angle",
        start: convertViewerPick(e.startPick, n),
        end: convertViewerPick(e.endPick, n),
        color: convertViewerColorToConnectColor(e.color),
      };
      if (e.secondPick) {
        const t = convertViewerPick(e.startPick, n);
        i = (function (e, ...t) {
          return Object.assign({}, e, ...t);
        })(i, {
          positionX: t.positionX,
          positionY: t.positionY,
          positionZ: t.positionZ,
          referenceObject: t.referenceObject,
          start: convertViewerPick(e.secondPick, n),
        });
      }
      return t(i);
    });
  });
}
function convertViewerCameraToConnectCamera(e) {
  return {
    distance: 1e3,
    projectionType: e.projectionType,
    targetX: 1e3 * (e.position.x + e.direction.x),
    targetY: 1e3 * (e.position.y + e.direction.y),
    targetZ: 1e3 * (e.position.z + e.direction.z),
    viewAngle: e.fieldOfView,
    viewScale: e.orthoSize || 0,
    pitch: e.rotation.pitch,
    yaw: e.rotation.yaw,
  };
}
function convertViewerDirectionToConnectDirection(e) {
  return { x: -e.x, y: -e.y, z: -e.z };
}
function convertViewerPointToConnectPoint(e) {
  return { x: 1e3 * e.x, y: 1e3 * e.y, z: 1e3 * e.z };
}
function convertViewerClipPlaneToConnectSectionPlane(e) {
  const { x: t, y: n, z: i } = convertViewerDirectionToConnectDirection(e.normal),
    { x: o, y: r, z: s } = convertViewerPointToConnectPoint(e.position);
  return { directionX: t, directionY: n, directionZ: i, positionX: o, positionY: r, positionZ: s };
}
function convertApiCameraToViewerCamera(e) {
  const n = e;
  let i;
  return (
    void 0 !== n.pitch && void 0 !== n.yaw
      ? (i = void 0)
      : n.quaternion
      ? (i = new t().copy(n.quaternion))
      : n.lookAt && n.upDirection && (i = new t().setFromRotationMatrix(new r().lookAt(n.lookAt, n.position, n.upDirection))),
    isApiCamera(n)
      ? convertConnectCameraDetailsToViewerCamera(
          convertViewerPointToConnectPoint(n.position),
          i,
          void 0 !== n.pitch ? { pitch: n.pitch, yaw: n.yaw } : void 0,
          n.projectionType,
          n.fieldOfView,
          n.orthoSize,
        )
      : (function (e) {
          return (
            (e && void 0 !== typeof e.targetX) ||
            void 0 !== typeof e.targetY ||
            void 0 !== typeof e.targetZ ||
            void 0 !== typeof e.pitch ||
            void 0 !== typeof e.yaw ||
            void 0 !== typeof e.distance
          );
        })(e)
      ? convertConnectCameraToViewerCamera(e)
      : void 0
  );
}
function isApiCamera(e) {
  return e && (defined(e.position) || defined(e.lookAt) || defined(e.quaternion));
}
function getObjectRuntimeIdToPersistentIdMap(e) {
  return new Promise((t) => {
    const n = {};
    Promise.all([
      e.startPick.model && e.startPick.id ? getPersistentIds(e.startPick.model.modelId, [e.startPick.id]) : Promise.resolve([void 0]),
      e.endPick.model && e.endPick.id ? getPersistentIds(e.endPick.model.modelId, [e.endPick.id]) : Promise.resolve([void 0]),
    ]).then((i) => {
      e.startPick.model && e.startPick.id && (n[e.startPick.model.modelId] = { [e.startPick.id]: i[0][0] }),
        e.endPick.model &&
          e.endPick.id &&
          (n[e.endPick.model.modelId]
            ? (n[e.endPick.model.modelId][e.endPick.id] = i[1][0])
            : (n[e.endPick.model.modelId] = { [e.endPick.id]: i[1][0] })),
        t(n);
    });
  });
}
function getPersistentObjectIdToRuntimeIdMap(e) {
  return new Promise((t) => {
    const n = e.models.map((e) => getTrimbimModel(e)).filter((e) => e),
      i = e.markups.reduce((e, t) => {
        var n, i;
        return (
          (null === (n = t.start) || void 0 === n ? void 0 : n.referenceObject) &&
            !e.includes(t.start.referenceObject) &&
            e.push(t.start.referenceObject),
          (null === (i = t.end) || void 0 === i ? void 0 : i.referenceObject) && !e.includes(t.end.referenceObject) && e.push(t.end.referenceObject),
          e
        );
      }, []),
      o = i.map(
        (e) =>
          new Promise((t) => {
            Promise.all(n.map((t) => getEntityIds(t, [e], void 0))).then((e) => {
              const i = e.findIndex((e) => !!e[0]);
              t(i > -1 ? { objectRuntimeId: e[i][0], modelVersionId: n[i].modelId } : { objectRuntimeId: void 0, modelVersionId: void 0 });
            });
          }),
      );
    Promise.all(o).then((e) => {
      const n = i.reduce((t, n, i) => (e[i].objectRuntimeId && e[i].modelVersionId && (t[n] = e[i]), t), {});
      t(n);
    });
  });
}
const W = 0.2;
var B;
async function loadViewToWeb3D(e, t, n, i) {
  var o, r, s, a, c;
  let d = !0;
  const u = await getView(e),
    l = convertConnectCameraToViewerCamera(u.camera);
  await configureCamera(l),
    await (async function (e) {
      if (!e) return;
      for (const t of Object.keys(e)) {
        const n = X.getModel(t);
        if (n) {
          const i = e[t];
          for (const e of i) await n.setLayerVisibility(e, !1);
        }
      }
    })(i);
  try {
    addClipPlanes(u.sectionPlanes);
  } catch (e) {
    logError("Error while loading clip planes of view.", e), (d = !1);
  }
  try {
    await addMarkups(u);
  } catch (e) {
    logError("Error while loading markups of view.", e), (d = !1);
  }
  !(async function (e) {
    var t;
    const n = (null === (t = e.presentation) || void 0 === t ? void 0 : t.transparencyLevel) ? e.presentation.transparencyLevel : 100;
    X.settings.globalOpacity = n / 100;
  })(u),
    emit(J.ActivateGhostMode, null === (o = u.presentation) || void 0 === o ? void 0 : o.ghost),
    emit(J.EnableObjectLinks, null === (r = u.presentation) || void 0 === r ? void 0 : r.isNotesEnabled),
    emit(J.EnableAnnotations, (null === (s = u.markups) || void 0 === s ? void 0 : s.length) > 0),
    emit(J.EnableClipPlanes, (null === (a = u.sectionPlanes) || void 0 === a ? void 0 : a.length) > 0);
  const p = await getEntityStatesFromView(t, u, n);
  return (
    await (async function (e, t) {
      const n = new Map();
      for (const t in e.Colored)
        if (e.Colored.hasOwnProperty(t)) {
          const i = X.getModel(t),
            o = e.Hidden.hasOwnProperty(t) ? e.Hidden[t] : [],
            r = e.Colored[t];
          for (const e of r) {
            await i.setCustomMaterial([...e.entityIds], e.material);
            const r = e.entityIds.filter((e) => !o.includes(e));
            n.has(t) ? n.set(t, Array.from(new Set([...n.get(t), ...r]))) : n.set(t, r);
          }
        }
      for (const n in e.Hidden)
        if (e.Hidden.hasOwnProperty(n)) {
          const i = X.getModel(n),
            o = e.Hidden[n];
          t ? (await i.setCustomMaterial(o, { opacity: 0.2 }), await i.setPickPriority(o, 2)) : await i.setVisibility(o, !1);
        }
      for (const t in e.Selected)
        e.Selected.hasOwnProperty(t) && X.selection.set(t, e.Selected[t]),
          n.has(t) ? n.set(t, Array.from(new Set([...n.get(t), ...e.Selected[t]]))) : n.set(t, e.Selected[t]);
      n.forEach(async (e, t) => {
        const n = X.getModel(t),
          i = await n.getHierarchyParents(e, void 0, !0);
        i.length && (await n.setVisibility(i, !0));
      });
    })(p, null === (c = u.presentation) || void 0 === c ? void 0 : c.ghost),
    d
  );
}
async function loadAPIView(e) {
  let t;
  (t = isApiCamera(e.camera) ? convertApiCameraToViewerCamera(e.camera) : convertConnectCameraToViewerCamera(e.camera)),
    await configureCamera(t),
    addClipPlanes(e.sectionPlanes);
}
async function createView(e, t, n) {
  const i = await ((o = await X.screenshot(new s(278, 156))),
  new Promise((e) => {
    const t = new FileReader();
    (t.onload = (t) => e(t.target.result)), t.readAsDataURL(o);
  }));
  var o;
  const r = convertViewerCameraToConnectCamera(createCameraData()),
    a = Y.getMarkups(),
    h = await (async function (e, t) {
      const n = [];
      for (const t of e) {
        const e = X.selection.get(t),
          i = getTrimbimModel(t);
        if (i) {
          const o = await i.getVisibleEntityIds(!1),
            r = await i.getEntityIdsByPickPriority(2),
            s = (await i.getCustomMaterialEntityIds()).filter((e) => !r.includes(e)),
            a = await i.getCustomMaterials(s),
            c = e && e.filter((e) => o.includes(e));
          let d = e,
            u = o;
          if ((c && ((d = e && e.filter((e) => !c.includes(e))), (u = o.filter((e) => !c.includes(e)))), r && r.length > 0 && u.push(...r), d)) {
            const e = await getPersistentIds(t, d);
            for (let o = 0; o < e.length; o++) {
              const r = e[o];
              n.push({
                sourceId: r,
                state: F.Selected,
                versionId: t,
                isRecursive: o < d.length && (await i.getHierarchyChildren([d[o]], !0)).length > 0,
              });
            }
          }
          if (u) {
            (await getPersistentIds(t, u)).forEach((e) => {
              n.push({ sourceId: e, state: F.Hidden, versionId: t });
            });
          }
          if (c) {
            (await getPersistentIds(t, c)).forEach((e) => {
              n.push({ sourceId: e, state: F.SelectedHidden, versionId: t });
            });
          }
          if (s) {
            const e = await getPersistentIds(t, s);
            for (let o = 0; o < e.length; o++) {
              const r = e[o],
                c = convertViewerMaterialToConnectColor(a[o]),
                d = o < s.length && (await i.getHierarchyChildren([s[o]], !0)).length > 0,
                u = n.find((e) => e.sourceId === r && e.versionId === t);
              u ? ((u.color = c), (u.isRecursive = d)) : n.push({ sourceId: r, state: F.Visible, versionId: t, color: c, isRecursive: d });
            }
          }
        }
      }
      return {
        elementTypes: [],
        elements: n,
        ghost: t.ghostMode,
        isCriticalEnabled: !1,
        isDocumentsEnabled: !1,
        isIgnoredEnabled: !1,
        isNewEnabled: !1,
        isNotesEnabled: t.notesEnabled,
        isPendingEnabled: !1,
        isResolvedEnabled: !1,
        transparencyLevel: 100 * X.settings.globalOpacity,
        transparent: 1 !== X.settings.globalOpacity,
        wireframe: !1,
      };
    })(t, n),
    y = X.tools.get(c).getClipPlanes().map(convertViewerClipPlaneToConnectSectionPlane),
    w = a
      .filter((e) => e.name !== g.Name && e.name !== v.Name)
      .map((e) => {
        if (e.name === p.Name) return convertViewerTextMarkupToConnectMarkup(e);
        if (e.name === l.Name) return convertViewerArrowMarkupToConnectMarkup(e);
        if (e.name === d.Name) return convertViewerCloudMarkupToConnectMarkup(e);
        if (e.name === u.Name) return convertViewerLineMarkupToConnectMarkup(e);
        if (e.name === f.Name) return convertViewerFreelineMarkupToConnectMarkup(e, r);
        if (e.name === m.Name) return convertViewerPointMarkupToConnectMarkup(e);
        throw new Error("Unknown markup type");
      }),
    C = await Promise.all(
      a
        .filter((e) => e.name === g.Name)
        .map(
          (e) =>
            new Promise((t) => {
              convertViewerMeasurementToConnectMarkup(e).then((e) => {
                t(e);
              });
            }),
        ),
    ),
    T = await Promise.all(
      a
        .filter((e) => e.name === v.Name)
        .map(
          (e) =>
            new Promise((t) => {
              convertViewerAngleMeasurementToConnectMarkup(e).then((e) => {
                t(e);
              });
            }),
        ),
    ),
    P = {
      origin: "",
      camera: r,
      files: e,
      imageData: i,
      markups: [...w, ...C, ...T].filter((e) => null != e),
      models: t,
      presentation: h,
      sectionPlanes: y,
    };
  return Promise.resolve(P);
}
async function getView(e) {
  let t;
  if ("string" == typeof e) {
    if (
      ((t = await (async function (e) {
        return new Promise((t, n) => {
          const i = new XMLHttpRequest();
          i.open("GET", e, !0),
            (i.withCredentials = !0),
            (i.responseType = "json"),
            (i.onload = () => t(i.response)),
            (i.onerror = () => n("Error loading " + e)),
            i.send();
        });
      })(e)),
      !t)
    )
      throw new Error("Error in fetching the view from JSON file");
  } else t = e;
  return Promise.resolve(t);
}
async function configureCamera(e) {
  e.projectionType && (X.camera.projectionType = e.projectionType),
    e.fieldOfView && (X.camera.fieldOfView = e.fieldOfView),
    e.orthoSize && (X.camera.orthoSize = e.orthoSize),
    e.position && (X.camera.position = e.position),
    e.quaternion && (X.camera.quaternion = e.quaternion),
    e.rotation && (X.camera.quaternion = rotationToQuaternion(e.rotation));
}
async function getEntityStatesFromView(e, t, n) {
  const i = { Hidden: {}, Selected: {}, Colored: {} },
    o = (function (e, t) {
      const n = new Map();
      for (let i = 0; i < e.files.length; i++) {
        const o = t ? t.get(e.files[i]) : e.models[i],
          r = X.getModel(o);
        r && n.set(o, [i, o, r]);
      }
      return n;
    })(t, n),
    r = [];
  for (const n of o)
    r.push(
      new Promise(async (o) => {
        var r, s;
        try {
          const [a, [c, d, u]] = n,
            l = e ? e.get(a) : void 0;
          if (
            ((null === (r = t.presentation) || void 0 === r ? void 0 : r.elementTypes) &&
              (await getAllEntityStatesForElementTypes(t.presentation.elementTypes, u, i, d)),
            null === (s = t.presentation) || void 0 === s ? void 0 : s.elements)
          ) {
            const e = t.presentation.elements.filter((e) => e.versionId === t.models[c]),
              n = new Set(e.map((e) => e.state));
            for (const t of n) {
              const n = e.filter((e) => e.state === t),
                o = Array.from(new Set(n.map((e) => JSON.stringify(e.color))))
                  .map((e) => (e ? JSON.parse(e) : void 0))
                  .filter((e) => void 0 !== e);
              for (const e of o) {
                getEntityStatesForElementTypes(
                  d,
                  await getEntityIds(
                    u,
                    n.filter((t) => colorEqual(e, t.color)).map((e) => e.sourceId),
                    l,
                  ),
                  t,
                  e,
                  i,
                );
              }
              getEntityStatesForElementTypes(
                d,
                await getEntityIds(
                  u,
                  n.filter((e) => !e.color).map((e) => e.sourceId),
                  l,
                ),
                t,
                void 0,
                i,
              );
            }
          }
          await handleGridsVisibility(i.Hidden[d], u);
        } catch (e) {
          logError(`Failed to prepare entity states for model ${n[0]}`, e);
        } finally {
          o();
        }
      }),
    );
  return (
    await (async function (e) {
      return Promise.all(
        e.map((e) =>
          e.then(
            (e) => ({ result: e, status: "fulfilled" }),
            (e) => ({ error: e, status: "rejected" }),
          ),
        ),
      );
    })(r),
    i
  );
}
function addClipPlanes(e) {
  e &&
    e.map(convertConnectSectionPlaneToViewerClipPlane).forEach((e) => {
      X.tools.get(c).add(e.position, e.normal, void 0, "view");
    });
}
async function addMarkups(e) {
  if (e.markups) {
    const t = await getPersistentObjectIdToRuntimeIdMap(e);
    e.markups.forEach((e) => {
      switch (e.type) {
        case "cloud":
          addConnectCloudMarkupToViewer(e);
          break;
        case "line":
          addConnectLineMarkupToViewer(e);
          break;
        case "arrow":
          addConnectArrowMarkupToViewer(e);
          break;
        case "text":
          addConnectTextMarkupToViewer(e);
          break;
        case "redlines":
          addConnectFreelineMarkupToViewer(e);
          break;
        case "measure_with_pick":
          addConnectMeasurementMarkupToViewer(e, t);
          break;
        case "measure":
          addConnectSinglePointMeasurementToViewer(e);
          break;
        case "angle":
          addConnectAngleMeasurementToViewer(e, t);
          break;
        default:
          throw new Error(`Unknown markup type: '${e.type}'`);
      }
    });
  }
}
async function getGrids(e) {
  return await e.findEntitiesByClass("IFCGRID");
}
async function getAllEntityStatesForElementTypes(e, t, n, i) {
  for (const o of e) {
    getEntityStatesForElementTypes(i, await t.findEntitiesByClass(o.type), o.state, o.color, n);
  }
}
function getEntityStatesForElementTypes(e, t, n, i, o) {
  if (
    !(t.length <= 0) &&
    (void 0 !== n &&
      ((function (e) {
        if (e === F.Hidden || e === F.SelectedHidden) return !0;
        return !1;
      })(n) && (o.Hidden[e] ? o.Hidden[e].push(...t) : (o.Hidden[e] = [...t])),
      (function (e) {
        if (e === F.Selected || e === F.SelectedVisible) return !0;
        return !1;
      })(n) && (o.Selected[e] ? o.Selected[e].push(...t) : (o.Selected[e] = [...t]))),
    void 0 !== i)
  ) {
    const n = { opacity: i.a / 255 },
      r = convertConnectColorToViewerColor(i);
    if ((r && (n.color = r), o.Colored[e])) {
      const i = o.Colored[e].find((e) => colorEqual(e.material.color, n.color));
      i ? i.entityIds.push(...t) : o.Colored[e].push({ material: n, entityIds: [...t] });
    } else o.Colored[e] = [{ material: n, entityIds: [...t] }];
  }
}
function colorEqual(e, t) {
  return e && t ? e.r === t.r && e.g === t.g && e.b === t.b && e.a === t.a : e === t;
}
async function handleGridsVisibility(e, t) {
  const n = await getGrids(t);
  if (e) {
    const i = n.filter((t) => !e.includes(t));
    i.length > 0 && (await t.setVisibility(i, !0), emit(J.EnableGrids, !0));
  } else await t.setVisibility(n, !0), emit(J.EnableGrids, !0);
  return Promise.resolve();
}
async function getVisibleGridIdsInView(e, t, n, i) {
  let o, r;
  const s = await getEntityStatesFromView(e, t, i),
    a = X.getModel(n);
  if (a) {
    const e = await getGrids(a);
    s.Hidden.hasOwnProperty(n) && (o = s.Hidden[n]), (r = o ? e.filter((e) => !o.includes(e)) : e);
  }
  return r;
}
!(function (e) {
  (e.Extension = "extension"), (e.View = "view");
})(B || (B = {}));
let Q = 0;
function generateApiIconId() {
  return --Q;
}
async function createLinkIcons(e, t) {
  const i = [],
    o = X.getModel(e);
  if (o && t.length > 0) {
    const e = await o.getBoundingBoxes(t.map((e) => e.entityId));
    for (let o = 0; o < t.length; o++) {
      const r = t[o],
        s = e[o].getCenter(new n());
      i.push({ iconPath: r.icon, id: r.iconId, position: s, size: r.iconSize });
    }
  }
  return i;
}
async function removeIcons(e) {
  if (e.length) return X.plugins.get(y).remove(e);
}
async function addIcons(e) {
  if (e.length) return X.plugins.get(y).add(e);
}
function clearIcons() {
  const e = X.plugins.get(y),
    t = e.getIcons().filter((e) => e.id >= 0);
  t && t.length && e.remove(t);
}
async function getLayers(e, t) {
  return t && t.length > 0 ? await e.findLayersByEntities(t) : await e.getLayers();
}
async function getLayerVisibility(e, t) {
  return await e.getLayerVisibility(t);
}
async function setLayerVisibility(e, t, n) {
  return await e.setLayerVisibility(t, n);
}
export {
  B as ClipPlaneOrigin,
  W as GHOST_MODE_OPACITY,
  J as Web3DWrapperEventName,
  addClipPlanes,
  addCloudMarkupToViewer,
  addConnectAngleMeasurementToViewer,
  addConnectArrowMarkupToViewer,
  addConnectCloudMarkupToViewer,
  addConnectFreelineMarkupToViewer,
  addConnectLineMarkupToViewer,
  addConnectMeasurementMarkupToViewer,
  addConnectSinglePointMeasurementToViewer,
  addConnectTextMarkupToViewer,
  addIcons,
  addMarkups,
  addTextMarkupToViewer,
  clearIcons,
  configure,
  convertApiCameraToViewerCamera,
  convertConnectAlignmentToViewerPlacement,
  convertConnectCameraDetailsToViewerCamera,
  convertConnectCameraToViewerCamera,
  convertConnectColorToViewerColor,
  convertConnectDirectionToViewerDirection,
  convertConnectPointToViewerPoint,
  convertConnectSectionPlaneToViewerClipPlane,
  convertViewerAngleMeasurementToConnectMarkup,
  convertViewerArrowMarkupToConnectMarkup,
  convertViewerCameraToConnectCamera,
  convertViewerClipPlaneToConnectSectionPlane,
  convertViewerCloudMarkupToConnectMarkup,
  convertViewerColorToConnectColor,
  convertViewerDirectionToConnectDirection,
  convertViewerFreelineMarkupToConnectMarkup,
  convertViewerLineMarkupToConnectMarkup,
  convertViewerMaterialToConnectColor,
  convertViewerMeasurementToConnectMarkup,
  convertViewerPointMarkupToConnectMarkup,
  convertViewerPointToConnectPoint,
  convertViewerTextMarkupToConnectMarkup,
  createCameraData,
  createLinkIcons,
  createView,
  emit,
  G as eventEmitter,
  generateApiIconId,
  getCameraUpDirection,
  getEntityIds,
  getEntityStatesForElementTypes,
  getGrids$1 as getGrids,
  getLayerVisibility,
  getLayers,
  getObjectRuntimeIdToPersistentIdMap,
  getPartIdsFromAssemblyIds,
  getPersistentIds,
  getPersistentObjectIdToRuntimeIdMap,
  getTrimbimModel,
  getView,
  getVisibleGridIdsInView,
  H as identifierBuilder,
  isApiCamera,
  isBackgroundImage360,
  loadAPIView,
  loadViewToWeb3D,
  Y as markupPlugin,
  on,
  quaternionToRotation,
  removeEventListener,
  removeIcons,
  rotationToQuaternion,
  setLayerVisibility,
  Z as trimbimPlugin,
  X as web3DViewer,
};
