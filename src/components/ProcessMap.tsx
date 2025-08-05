
import React from 'react';
import { ClipboardList, FileText, PlaneTakeoff, Users, CheckCircle, Handshake } from 'lucide-react';

const ProcessMap = () => {
  const processSteps = [{
    icon: <ClipboardList className="w-10 h-10" />,
    title: "Define process",
    subtitle: "Discovery Call",
    description: "We'll start with a no-pressure conversation where I'll listen to your goals and answer your questions. This is our chance to get to know each other and make sure we're a great fit before moving forward together."
  }, {
    icon: <FileText className="w-10 h-10" />,
    title: "Outline steps",
    subtitle: "Application & Document Intake",
    description: "I'll guide you step-by-step through the paperwork, using secure digital tools so you always know exactly what's needed and when. My goal is to make this as clear and stress-free as possible."
  }, {
    icon: <PlaneTakeoff className="w-10 h-10" />,
    title: "Create process map",
    subtitle: "Mortgage Strategy Design",
    description: "Next, I'll design a personalized mortgage plan tailored to your unique situation and long-term goals. I'll walk you through all your options and explain the pros and cons, so you can make confident, informed decisions."
  }, {
    icon: <Users className="w-10 h-10" />,
    title: "Identify stakeholders",
    subtitle: "Lender Matching & Submission",
    description: "With access to 50+ lenders, I'll do the legwork to find the best mortgage fit for you—not just the fastest approval. I'm committed to finding a solution that truly aligns with your needs."
  }, {
    icon: <CheckCircle className="w-10 h-10" />,
    title: "Sequence steps",
    subtitle: "Underwriting & Approval Navigation",
    description: "I'll handle all the communications and problem-solving with the lender behind the scenes, keeping you updated in plain, jargon-free language so you always know what's happening and why."
  }, {
    icon: <Handshake className="w-10 h-10" />,
    title: "Implement and iterate",
    subtitle: "Closing & Beyond",
    description: "I'll ensure your closing goes smoothly and, even after your mortgage funds, reach out anytime. My commitment to your financial well-being doesn't end at closing."
  }];

  return (
    <div className="space-y-8">
      {processSteps.map((step, index) => (
        <div key={index} className="flex items-start gap-6 p-6 bg-pure-white/50 backdrop-blur-sm border border-hunter-green/20 rounded-lg">
          <div className="flex-shrink-0 p-3 bg-muted-red/10 rounded-full text-muted-red">
            {step.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-hammersmith font-semibold text-hunter-green mb-2">
              {step.subtitle}
            </h3>
            <p className="text-hunter-green/80 leading-relaxed text-lg font-opensauce">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcessMap;
