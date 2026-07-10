import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Shield,
  KeyRound,
  Mail,
  Table2,
  ClipboardList,
  UserPlus,
  Bell,
  Activity,
  Sparkles,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';

interface WorkflowNode {
  label: string;
  icon: LucideIcon;
  sublabel?: string;
}

interface WorkflowCardProps {
  title: string;
  accent: 'amber' | 'blue';
  nodes: WorkflowNode[];
  startDelay: number;
}

function WorkflowCard({ title, accent, nodes, startDelay }: WorkflowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });
  const [activeNode, setActiveNode] = useState(-1);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    if (!isInView) {
      setActiveNode(-1);
      setShowBadge(false);
      return;
    }

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setActiveNode(-1);
      setShowBadge(false);

      for (let i = 0; i < nodes.length; i++) {
        const t = setTimeout(() => {
          setActiveNode(i);
        }, startDelay + i * 600);
        timeouts.push(t);
      }

      const badgeT = setTimeout(() => {
        setShowBadge(true);
      }, startDelay + (nodes.length - 1) * 600 + 300);
      timeouts.push(badgeT);

      const resetT = setTimeout(() => {
        setActiveNode(-1);
        setShowBadge(false);
        timeouts = [];
        runCycle();
      }, startDelay + (nodes.length - 1) * 600 + 300 + 2500);
      timeouts.push(resetT);
    }

    runCycle();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isInView, nodes.length, startDelay]);

  const accentClasses = {
    icon: accent === 'amber'
      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
      : 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    line: accent === 'amber' ? 'bg-amber-400' : 'bg-blue-400',
    pulse: accent === 'amber'
      ? 'rgba(251,191,36,0.35)'
      : 'rgba(96,165,250,0.35)',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay: startDelay / 1000 }}
      className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6"
    >
      <h3 className="font-bold text-white text-lg mb-6">{title}</h3>

      <div className="flex flex-col">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isActive = activeNode >= i;
          const isCurrentlyActive = activeNode === i;

          return (
            <div key={i}>
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? accentClasses.icon
                        : 'bg-gray-800 border-gray-700 text-gray-400'
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  {isCurrentlyActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      style={{ backgroundColor: accentClasses.pulse }}
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{node.label}</p>
                  {node.sublabel && (
                    <p className="text-xs text-gray-500 mt-0.5">{node.sublabel}</p>
                  )}
                </div>
              </div>

              {i < nodes.length - 1 && (
                <div className="ml-5 w-0.5 h-8 bg-gray-800 relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 origin-top ${accentClasses.line}`}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeNode > i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ transformOrigin: 'top' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 h-8 flex items-center">
        <AnimatePresence>
          {showBadge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-full"
            >
              Completed in ~3 seconds
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const workflows: Omit<WorkflowCardProps, 'startDelay'>[] = [
  {
    title: 'Password Reset',
    accent: 'amber',
    nodes: [
      { label: 'Staff submits form', icon: FileText, sublabel: 'Tally.so' },
      { label: 'Azure authenticates', icon: Shield, sublabel: 'Microsoft Graph' },
      { label: 'Password reset', icon: KeyRound, sublabel: 'Azure AD' },
      { label: 'Email sent', icon: Mail, sublabel: 'Outlook' },
      { label: 'Logged to sheet', icon: Table2, sublabel: 'Google Sheets' },
    ],
  },
  {
    title: 'New Starter Onboarding',
    accent: 'blue',
    nodes: [
      { label: 'Manager submits form', icon: ClipboardList, sublabel: 'Tally.so' },
      { label: 'Account created', icon: UserPlus, sublabel: 'Azure AD' },
      { label: 'Welcome email', icon: Mail, sublabel: 'New Starter' },
      { label: 'IT notified', icon: Bell, sublabel: 'IT Team' },
      { label: 'Audit logged', icon: Table2, sublabel: 'Google Sheets' },
    ],
  },
  {
    title: 'IT Alert Triage',
    accent: 'amber',
    nodes: [
      { label: 'Alert received', icon: Activity, sublabel: 'Azure Monitor' },
      { label: 'AI summarises', icon: Sparkles, sublabel: 'Google Gemini' },
      { label: 'Severity classified', icon: AlertTriangle, sublabel: 'Critical / Medium / Low' },
      { label: 'Team notified', icon: MessageSquare, sublabel: 'Teams / Email' },
      { label: 'Audit logged', icon: Table2, sublabel: 'Google Sheets' },
    ],
  },
];

export function WorkflowDiagram() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="how-it-works-diagram"
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-4">
          <p className="text-amber-400 uppercase tracking-widest text-xs font-semibold mb-3">
            AUTOMATION IN ACTION
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See How the Workflows Run
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center">
            Each automation fires in seconds. No manual steps. No delays. Just trigger &rarr; outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {workflows.map((workflow, i) => (
            <WorkflowCard
              key={workflow.title}
              {...workflow}
              startDelay={i * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
