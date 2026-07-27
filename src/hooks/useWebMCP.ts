import { useEffect } from 'react';

interface WebMCPHandlers {
  navigateToSection: (sectionId: string) => void;
  openServiceDetails: (serviceKey: string) => void;
  startBooking: (prefill?: { name?: string; email?: string; company?: string; contactNumber?: string }) => void;
  sendInquiry: (inquiry: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    phoneNumber?: string;
    company?: string;
    companySize?: string;
    industry?: string;
    automationType?: string;
    currentTools?: string;
  }) => Promise<{ success: boolean; error?: string }>;
}

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'process', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'book-call', label: 'Book Call' },
  { id: 'contact', label: 'Contact' },
];

const SERVICES = [
  { name: 'AI Alert Triage', description: 'Automated triage and routing of IT alerts in roughly 3 seconds end-to-end.', key: 'AI Alert Triage' },
  { name: 'IT Helpdesk Automation', description: 'Automated handling of common helpdesk requests such as password resets.', key: 'IT Helpdesk Automation' },
  { name: 'Employee Onboarding', description: 'Automated onboarding of new starters — accounts, access, and welcome email ready on day one.', key: 'Employee Onboarding' },
  { name: 'AI Support Assistants', description: 'RAG-based AI assistants that answer questions from your own documentation, available 24/7.', key: 'AI Support Assistants' },
  { name: 'Custom Workflows', description: 'Bespoke automation of any process that involves copying data or waiting for a human.', key: 'Custom Workflows' },
  { name: 'WEEE & IT Asset Disposal', description: 'Secure, certified, zero-to-landfill IT asset recycling and disposal.', key: 'WEEE & IT Asset Disposal' },
];

export function useWebMCP(handlers: WebMCPHandlers) {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.modelContext) return;

    const tools: WebMCPTool[] = [
      {
        name: 'list_services',
        description: 'List all services offered by Gauntlet Group with names and short descriptions.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => SERVICES.map((s) => ({ name: s.name, description: s.description })),
      },
      {
        name: 'open_service_details',
        description: 'Open the details modal for a specific service on the page so the visitor can read more.',
        inputSchema: {
          type: 'object',
          properties: {
            serviceName: {
              type: 'string',
              description: 'The exact service name',
              enum: SERVICES.map((s) => s.name),
            },
          },
          required: ['serviceName'],
        },
        execute: async (args) => {
          const service = SERVICES.find((s) => s.name === args.serviceName);
          if (!service) return { error: 'Service not found' };
          handlers.openServiceDetails(service.key);
          return { success: true, message: `Opened details for ${service.name}` };
        },
      },
      {
        name: 'navigate_to_section',
        description: 'Scroll the page to a specific section of the Gauntlet Group site.',
        inputSchema: {
          type: 'object',
          properties: {
            section: {
              type: 'string',
              description: 'The section id to navigate to',
              enum: SECTIONS.map((s) => s.id),
            },
          },
          required: ['section'],
        },
        execute: async (args) => {
          const sectionId = args.section as string;
          if (!SECTIONS.some((s) => s.id === sectionId)) return { error: 'Section not found' };
          handlers.navigateToSection(sectionId);
          return { success: true, message: `Navigated to ${sectionId}` };
        },
      },
      {
        name: 'list_sections',
        description: 'List all sections of the Gauntlet Group site that can be navigated to.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => SECTIONS.map((s) => ({ id: s.id, label: s.label })),
      },
      {
        name: 'start_booking',
        description: 'Scroll to the booking section and optionally pre-fill the Calendly widget with the visitor details.',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Full name of the visitor' },
            email: { type: 'string', description: 'Email address of the visitor' },
            company: { type: 'string', description: 'Company name' },
            contactNumber: { type: 'string', description: 'Contact phone number' },
          },
        },
        execute: async (args) => {
          handlers.startBooking({
            name: args.name as string | undefined,
            email: args.email as string | undefined,
            company: args.company as string | undefined,
            contactNumber: args.contactNumber as string | undefined,
          });
          return { success: true, message: 'Booking section opened with prefill details' };
        },
      },
      {
        name: 'send_inquiry',
        description: 'Submit a contact inquiry on behalf of the visitor. Requires at least firstName, lastName, email, and message.',
        inputSchema: {
          type: 'object',
          properties: {
            firstName: { type: 'string', description: 'First name (required)' },
            lastName: { type: 'string', description: 'Last name (required)' },
            email: { type: 'string', description: 'Email address (required)' },
            message: { type: 'string', description: 'The inquiry message (required, min 10 chars)' },
            phoneNumber: { type: 'string', description: 'Contact phone number (optional)' },
            company: { type: 'string', description: 'Company name (optional)' },
            companySize: { type: 'string', description: 'Company size (optional)' },
            industry: { type: 'string', description: 'Industry (optional)' },
            automationType: { type: 'string', description: 'Area to automate (optional)' },
            currentTools: { type: 'string', description: 'Current tools used (optional)' },
          },
          required: ['firstName', 'lastName', 'email', 'message'],
        },
        execute: async (args) => {
          const required = ['firstName', 'lastName', 'email', 'message'];
          for (const field of required) {
            if (!args[field] || String(args[field]).trim().length === 0) {
              return { success: false, error: `Missing required field: ${field}` };
            }
          }
          if (String(args.message).trim().length < 10) {
            return { success: false, error: 'Message must be at least 10 characters' };
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(String(args.email).trim())) {
            return { success: false, error: 'Invalid email address' };
          }
          return handlers.sendInquiry({
            firstName: String(args.firstName),
            lastName: String(args.lastName),
            email: String(args.email),
            message: String(args.message),
            phoneNumber: args.phoneNumber as string | undefined,
            company: args.company as string | undefined,
            companySize: args.companySize as string | undefined,
            industry: args.industry as string | undefined,
            automationType: args.automationType as string | undefined,
            currentTools: args.currentTools as string | undefined,
          });
        },
      },
      {
        name: 'get_organization_info',
        description: 'Get information about Gauntlet Group including contact details, service area, hours, and compliance certifications.',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => ({
          name: 'Gauntlet Group',
          url: 'https://gauntlet-group.com/',
          description: 'Gauntlet Group designs and implements AI-powered IT automations for growing businesses.',
          contact: {
            email: 'imran.ishaq@gauntlet-group.com',
            phone: '+44-7800-721443',
            linkedin: 'https://www.linkedin.com/company/gauntlet-group',
          },
          serviceArea: 'GB',
          hours: 'Mon-Fri 09:00-17:00 GMT',
          compliance: { certifications: ['ISO 27701'], privacy: 'GDPR compliant' },
        }),
      },
    ];

    navigator.modelContext!.provideContext(tools).catch((err) => {
      console.warn('WebMCP registration failed:', err);
    });
  }, [handlers]);
}
