export const MODULES_CATALOG = [
  // ================= CORE MODULES =================
  {
    id: "M-C01",
    title: "Company Story & Values",
    track: "core",
    type: "VIDEO",
    day: 1,
    estimatedTime: "10 min",
    completionCheck: "Watch progress + Quiz (Pass >= 80%)",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    videoPoster: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80",
    description: "Discover our journey from a small logistics startup to an enterprise serving 12 cities across India, driven by integrity, customer success, and operational speed.",
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "What is TrainFlow's core mission across its 12 regional hubs in India?",
          options: [
            "Maximizing manual paperwork",
            "Delivering standardized, high-speed regional growth & transparent service",
            "Offshoring operations",
            "Minimizing recruit onboarding interactions"
          ],
          correctIndex: 1,
          explanation: "TrainFlow prioritizes speed, standard quality, and transparent customer service across all branch locations."
        },
        {
          id: "q2",
          question: "Which core company value emphasizes taking ownership of customer solutions?",
          options: [
            "Passing responsibility upstream",
            "Customer Obsession & Radical Accountability",
            "Delayed escalation",
            "Selective compliance"
          ],
          correctIndex: 1,
          explanation: "Radical Accountability ensures every employee takes immediate ownership until customer resolution."
        }
      ]
    }
  },
  {
    id: "M-C02",
    title: "Code of Conduct",
    track: "core",
    type: "READING",
    day: 1,
    estimatedTime: "15 min",
    completionCheck: "Scroll acknowledgment + Policy Quiz",
    readingContent: `
### TrainFlow Workplace Code of Conduct

#### 1. Professional Integrity & Ethical Standards
All recruits are expected to conduct business with absolute honesty and transparency. Any conflict of interest, misrepresentation of data, or unethical conduct will lead to immediate disciplinary action.

#### 2. Diversity, Equality & Harassment-Free Workplace
TrainFlow enforces zero tolerance for discrimination based on gender, region, caste, age, or background. We foster a psychological safe space where constructive dialog thrives across all 12 Indian offices.

#### 3. Data Confidentiality & Asset Protection
Company hardware, internal analytics, client contacts, and training modules are proprietary. Unsanctioned sharing with external parties or personal devices is strictly prohibited.

#### 4. Safety & Punctuality
Punctuality during 4-day onboarding and daily operations is mandatory. Adhere to regional branch timing and safety protocols at all times.
    `,
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "What is TrainFlow's policy regarding proprietary internal training materials?",
          options: [
            "They can be shared publicly on social media",
            "They are confidential assets for internal employee use only",
            "They should be sold to third-party vendors",
            "They have no copyright restrictions"
          ],
          correctIndex: 1,
          explanation: "All TrainFlow data, software, and learning assets are strict confidential assets."
        }
      ]
    }
  },
  {
    id: "M-C03",
    title: "Data & Security Basics",
    track: "core",
    type: "VIDEO",
    day: 1,
    estimatedTime: "12 min",
    completionCheck: "Watch video + Cybersecurity Quiz",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    videoPoster: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Learn essential cybersecurity practices, password management, phishing prevention, and customer data encryption compliance.",
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "You receive an email from an unverified address asking for your employee SSO credentials to fix an IT glitch. What should you do?",
          options: [
            "Send password immediately",
            "Ignore and share credentials over WhatsApp",
            "Report the phishing attempt to IT Security & do not click any links",
            "Reply with a dummy password"
          ],
          correctIndex: 2,
          explanation: "Never share credentials via email. Always report suspicious messages to IT Security."
        }
      ]
    }
  },
  {
    id: "M-C04",
    title: "Meet Your Manager",
    track: "core",
    type: "LIVE",
    day: 1,
    estimatedTime: "30 min",
    completionCheck: "Branch Manager Digital Sign-off",
    sessionDetails: {
      location: "Branch Manager Office / Teams Room 1",
      scheduledTime: "Day 1 - 04:00 PM IST",
      agenda: "Welcome meeting, branch overview, expectations, and introduction to team mentors.",
      signOffRole: "Branch Manager"
    }
  },
  {
    id: "M-C05",
    title: "Operations Fundamentals",
    track: "core",
    type: "VIDEO",
    day: 1,
    estimatedTime: "15 min",
    completionCheck: "Watch video + Ops Knowledge Check",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    videoPoster: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
    description: "Overview of how sales, operations, customer support, and branch management interconnect to deliver seamless service.",
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "How does the sales team coordinate with delivery ops once a agreement is signed?",
          options: [
            "They never communicate",
            "Via automated hand-off protocol in the TrainFlow ERP system within 2 hours",
            "By waiting for client complaint",
            "By calling customer 2 weeks later"
          ],
          correctIndex: 1,
          explanation: "Automated hand-off protocol ensures smooth operational fulfillment without delay."
        }
      ]
    }
  },

  // ================= SALES & MARKETING MODULES =================
  {
    id: "M-S01",
    title: "Product Portfolio",
    track: "sales",
    type: "VIDEO",
    day: 2,
    estimatedTime: "20 min",
    completionCheck: "Watch video + Product Specs Quiz",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    videoPoster: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    description: "In-depth breakdown of TrainFlow's core product offerings, tier packages, SLA guarantees, and target client personas.",
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "Which subscription tier includes dedicated 24/7 account management and custom API integration?",
          options: ["Starter Tier", "Growth Tier", "Enterprise Tier", "Free Tier"],
          correctIndex: 2,
          explanation: "Enterprise Tier comes bundled with dedicated account managers and customized APIs."
        }
      ]
    }
  },
  {
    id: "M-S02",
    title: "Customer Conversations",
    track: "sales",
    type: "SITUATIONAL_QUIZ",
    day: 2,
    estimatedTime: "15 min",
    completionCheck: "Pass Situational Scenario (Score >= 80%)",
    scenario: {
      title: "Scenario: Handling Price Sensitivity & Delay Anxiety",
      context: "A prospective client in Ahmedabad is interested in TrainFlow Enterprise service but expresses concern that pricing is 10% higher than local competitors and worries about onboarding delays.",
      questions: [
        {
          id: "sq1",
          question: "What is the best initial approach during the client call?",
          options: [
            "Immediately offer a 30% discount without manager approval",
            "Acknowledge their concern, highlight our SLA speed guarantee & 99.4% uptime value proof, and offer a phased pilot",
            "Tell them competitor prices are fake and demand a decision today",
            "End the call as unqualified lead"
          ],
          correctIndex: 1,
          explanation: "Validating concerns while proving value through SLAs and low-risk pilots builds trust without eroding margins."
        },
        {
          id: "sq2",
          question: "If the client asks for a custom implementation timeline, what should you do?",
          options: [
            "Promise a 1-day rollout without checking ops capacity",
            "Consult the Operations Lead to confirm actual SLA capacity before committing",
            "Tell the client timelines are fixed and non-negotiable",
            "Ask client to design the rollout timeline themselves"
          ],
          correctIndex: 1,
          explanation: "Cross-functional alignment with Ops prevents broken promises and ensures realistic commitments."
        }
      ]
    }
  },
  {
    id: "M-S03",
    title: "Market Research Task",
    track: "sales",
    type: "ACTIVITY",
    day: 3,
    estimatedTime: "30 min",
    completionCheck: "Submission + Manager Grading & Approval",
    activityInstructions: `
### Task Instructions: Regional Market Audit

1. Conduct a brief research of 3 potential enterprise accounts in your branch's city (e.g. Ahmedabad, Surat, Rajkot).
2. Identify their current pain points in supply chain or staff onboarding.
3. Formulate a 3-bullet pitch strategy showcasing how TrainFlow solves their problem.
4. Type your analysis in the text box below and attach any supporting notes or PDFs if available.
    `
  },
  {
    id: "M-S04",
    title: "Pricing & Offers",
    track: "sales",
    type: "READING",
    day: 3,
    estimatedTime: "15 min",
    completionCheck: "Read & Acknowledge + Pricing Matrix Quiz",
    readingContent: `
### TrainFlow Official Pricing Policy & Discount Authority Matrix

#### Standard Rate Card (FY26)
- **Standard Plan**: ₹15,000 / month per branch
- **Professional Plan**: ₹35,000 / month per branch
- **Enterprise Plan**: Custom quote (Min ₹75,000 / month)

#### Discount Approval Hierarchy
- **Sales Executive (Junior)**: Up to 5% standard promotional discount
- **Sales Lead (Mid)**: Up to 10% discount
- **Branch Manager (Senior)**: Up to 15% discount
- **VP Sales / HR**: Custom contract approval
    `,
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "What is the maximum discount percentage a Junior Sales Executive can approve independently?",
          options: ["15%", "10%", "5%", "0%"],
          correctIndex: 2,
          explanation: "Junior Sales Executives are authorized for up to 5% standard promotional discounts."
        }
      ]
    }
  },

  // ================= DELIVERY & OPS MODULES =================
  {
    id: "M-D01",
    title: "Service Playbook",
    track: "ops",
    type: "VIDEO",
    day: 2,
    estimatedTime: "20 min",
    completionCheck: "Watch video + Ops SOP Quiz",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    videoPoster: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
    description: "Standard Operating Procedures (SOP) for dispatch tracking, inventory control, route optimization, and branch dispatch logs.",
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "What is the maximum allowable SLA window for resolving high-priority dispatch blockers?",
          options: ["48 hours", "24 hours", "2 hours", "7 days"],
          correctIndex: 2,
          explanation: "High-priority dispatch blockers must be resolved within a 2-hour SLA window."
        }
      ]
    }
  },
  {
    id: "M-D02",
    title: "Field Safety",
    track: "ops",
    type: "READING",
    day: 2,
    estimatedTime: "15 min",
    completionCheck: "Read & Acknowledge + Safety Compliance Quiz",
    readingContent: `
### Field & Hub Safety Guidelines

#### Mandatory Safety Rules
1. All warehouse and dispatch personnel must wear protective footwear and high-visibility jackets.
2. Vehicles must undergo daily pre-trip 10-point check before route assignment.
3. Hazardous goods require designated storage and hazmat declaration paperwork.
4. Report any near-miss incidents to the Branch Operations Lead immediately.
    `,
    quiz: {
      passScore: 80,
      questions: [
        {
          id: "q1",
          question: "When should pre-trip vehicle safety checks be performed?",
          options: [
            "Once a month",
            "Daily before route assignment",
            "Only after a breakdown",
            "When requested by client"
          ],
          correctIndex: 1,
          explanation: "Daily pre-trip inspections are mandatory for all dispatch vehicles."
        }
      ]
    }
  },
  {
    id: "M-D03",
    title: "Live Ops Walkthrough",
    track: "ops",
    type: "LIVE",
    day: 3,
    estimatedTime: "45 min",
    completionCheck: "Operations Lead / Manager Live Sign-off",
    sessionDetails: {
      location: "Branch Dispatch Floor / Hub Control Room",
      scheduledTime: "Day 3 - 11:00 AM IST",
      agenda: "Hands-on walkthrough of barcode scanner equipment, live route console, and escalation desks.",
      signOffRole: "Branch Manager / Ops Head"
    }
  },
  {
    id: "M-D04",
    title: "Escalation Handling",
    track: "ops",
    type: "SITUATIONAL_QUIZ",
    day: 3,
    estimatedTime: "20 min",
    completionCheck: "Pass Escalation Scenarios (Score >= 80%)",
    scenario: {
      title: "Scenario: Route Breakdown & Delayed Delivery",
      context: "A key dispatch vehicle breaks down on the Rajkot-Ahmedabad highway carrying urgent medical supply packages due for delivery in 1 hour.",
      questions: [
        {
          id: "sq1",
          question: "What is your immediate priority step?",
          options: [
            "Wait for evening shift report",
            "Trigger Level-1 Emergency Backup vehicle dispatch & notify client account manager within 15 minutes",
            "Blame driver publicly on chat",
            "Cancel order in database"
          ],
          correctIndex: 1,
          explanation: "Triggering backup dispatch immediately while notifying client maintains SLA integrity."
        }
      ]
    }
  },

  // ================= FINAL ASSESSMENTS & CERTIFICATION =================
  {
    id: "M-X01",
    title: "Day-1 HR Feedback",
    track: "final",
    type: "LIVE",
    day: 1,
    estimatedTime: "15 min",
    completionCheck: "HR Admin Sign-off",
    sessionDetails: {
      location: "HR Portal Digital Check-in",
      scheduledTime: "Day 1 End",
      agenda: "HR welcome feedback, document verification, and initial onboarding satisfaction survey.",
      signOffRole: "HR Admin"
    }
  },
  {
    id: "M-X02",
    title: "Final Assessment",
    track: "final",
    type: "SITUATIONAL_QUIZ",
    day: 4,
    estimatedTime: "25 min",
    completionCheck: "Pass Comprehensive Final Exam (Score >= 80%)",
    scenario: {
      title: "TrainFlow 4-Day Onboarding Comprehensive Final Exam",
      context: "This exam covers core values, security rules, role-specific SOPs, situational handling, and escalation protocols.",
      questions: [
        {
          id: "fq1",
          question: "What primary rule governs TrainFlow module unlock progression?",
          options: [
            "Modules can be completed in any random order",
            "Day N+1 remains strictly locked until Day N modules & requirements are genuinely completed",
            "Managers can skip recruits directly to Day 4 without quizzes",
            "Recruits choose their own tracks manually"
          ],
          correctIndex: 1,
          explanation: "Sequential 4-day unlocking guarantees foundational mastery before progression."
        },
        {
          id: "fq2",
          question: "How does TrainFlow ensure recruits don't game the video and reading training?",
          options: [
            "By taking user's word",
            "By requiring real watch progress, interactive quizzes, activity submissions, and manager sign-offs",
            "By auto-completing modules after 5 seconds",
            "By hiding completion statuses"
          ],
          correctIndex: 1,
          explanation: "Multi-layered completion verification eliminates fake completions."
        },
        {
          id: "fq3",
          question: "What happens immediately after a recruit completes Day 4 and passes the Final Assessment?",
          options: [
            "The program restarts from Day 1",
            "A digital certificate is generated and training access shifts to CLOSED state",
            "The recruit must re-take all quizzes",
            "No record is saved"
          ],
          correctIndex: 1,
          explanation: "System generates official certificate and seals training access."
        }
      ]
    }
  },
  {
    id: "M-X03",
    title: "Certification",
    track: "final",
    type: "SYSTEM",
    day: 4,
    estimatedTime: "5 min",
    completionCheck: "Automatic System Grant on Final Exam Pass",
    description: "System verifies completion of all Day 1-4 modules, generates official digital certificate, and closes training access."
  }
];
