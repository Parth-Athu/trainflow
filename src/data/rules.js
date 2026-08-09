// Centralized Rule Configuration Matrix for TrainFlow Rule Engine.
// Maps (Role + Level) -> Assigned Tracks (Core, Sales & Marketing, Delivery & Ops)
// This structure is consumed by getLearningPath() and editable by HR Admin in HRDashboard.

export const DEFAULT_ROLE_RULES = {
  "Sales Executive": {
    "Junior": { tracks: ["core", "sales"], levelDesc: "Core + Sales & Marketing" },
    "Mid": { tracks: ["core", "sales"], levelDesc: "Core + Sales & Marketing" },
    "Senior": { tracks: ["core", "sales"], levelDesc: "Core + Sales & Marketing" }
  },
  "Marketing Associate": {
    "Junior": { tracks: ["core", "sales"], levelDesc: "Core + Sales & Marketing" },
    "Mid": { tracks: ["core", "sales"], levelDesc: "Core + Sales & Marketing" },
    "Senior": { tracks: ["core", "sales"], levelDesc: "Core + Sales & Marketing" }
  },
  "Operations Associate": {
    "Junior": { tracks: ["core", "ops"], levelDesc: "Core + Delivery & Ops" },
    "Mid": { tracks: ["core", "ops"], levelDesc: "Core + Delivery & Ops" },
    "Senior": { tracks: ["core", "ops"], levelDesc: "Core + Delivery & Ops" }
  },
  "Delivery Lead": {
    "Junior": { tracks: ["core", "ops"], levelDesc: "Core + Delivery & Ops" },
    "Mid": { tracks: ["core", "ops"], levelDesc: "Core + Delivery & Ops" },
    "Senior": { tracks: ["core", "ops"], levelDesc: "Core + Delivery & Ops" }
  },
  "Customer Support": {
    "Junior": { tracks: ["core"], levelDesc: "Core Only" },
    "Mid": { tracks: ["core"], levelDesc: "Core Only" },
    "Senior": { tracks: ["core"], levelDesc: "Core Only" }
  },
  "Branch Manager": {
    "Junior": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" },
    "Mid": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" },
    "Senior": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" }
  },
  "Area Head": {
    "Junior": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" },
    "Mid": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" },
    "Senior": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" }
  },
  "Regional Manager": {
    "Junior": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" },
    "Mid": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" },
    "Senior": { tracks: ["core", "sales", "ops"], levelDesc: "Core + Sales & Marketing + Delivery & Ops" }
  }
};

/**
 * Fallback Rule when a role/level is not explicitly defined in the matrix.
 * Core only.
 */
export const FALLBACK_RULE = {
  tracks: ["core"],
  levelDesc: "Core Only (Default Fallback)"
};
