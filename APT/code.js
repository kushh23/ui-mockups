import React, { useState } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('general');
  const [saved, setSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fontSource, setFontSource] = useState('preset');

  const primaryColor = '#0d9488';
  const primaryLight = '#ccfbf1';
  const primaryDark = '#0f766e';

  const stats = { total: 156, withThumbnail: 142, withoutThumbnail: 14, generated: 89, percentage: 91 };

  const recentLogs = [
    { id: 1, title: 'Getting Started with WordPress', size: '45 KB', type: 'AI Generated', status: 'success', time: '2 min ago' },
    { id: 2, title: 'Best Practices for SEO', size: '38 KB', type: 'From Title', status: 'success', time: '5 min ago' },
    { id: 3, title: 'Understanding Theme Development', size: '52 KB', type: 'Default Image', status: 'success', time: '8 min ago' },
    { id: 4, title: 'Plugin Security Guide', size: '—', type: 'AI Generated', status: 'failed', time: '12 min ago' },
  ];

  const generationMethods = [
    { value: 'title', label: 'Generate from title' },
    { value: 'find_post', label: 'Find in post' },
    { value: 'find_generate', label: 'Find or generate' },
    { value: 'google', label: 'Google' },
    { value: 'find_google', label: 'Find or Google' },
    { value: 'find_default', label: 'Find or use default image' },
    { value: 'ai', label: 'AI image generation' }
  ];

  const freeFonts = [
    'Arial', 'Helvetica', 'Verdana', 'Tahoma', 'Trebuchet MS', 'Georgia', 'Times New Roman', 'Courier New',
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Poppins', 'Nunito', 'Ubuntu', 'Merriweather',
    'Playfair Display', 'Source Sans Pro', 'PT Sans', 'Noto Sans', 'Rubik', 'Work Sans', 'Quicksand', 'Barlow',
    'Inter', 'Manrope', 'DM Sans', 'Outfit', 'Space Grotesk', 'Sora', 'Lexend', 'Urbanist'
  ];

  const [settings, setSettings] = useState({
    autoAddOnSave: true, autoAddOnSchedule: false, generationMethod: 'title',
    postTypes: { posts: true, pages: true, events: false }, deleteOnUninstall: false,
    autoImport: false, importPostTypes: { posts: false, pages: false, events: false },
    googleApiKey: '', googleSearchEngineId: '', pixabayApiKey: '', unsplashAccessKey: '', ibmWatsonApiKey: '', ibmWatsonEndpoint: ''
  });

  const [imageSettings, setImageSettings] = useState({
    backgroundType: 'color', backgroundColor: '#e415d3', backgroundImage: null, imageFormat: 'png', imageWidth: 400, imageHeight: 400,
    fontName: 'Poppins', googleFontUrl: '', customFontFile: null, fontSize: 25, fontColor: '#FFFFFF', textShadow: true, shadowColor: '#000000',
    textTransform: 'uppercase', textLength: 50, lineSpacing: 1.5, horizontalAlign: 'center', verticalAlign: 'center',
    paddingTopBottom: 15, paddingLeftRight: 15, stringBefore: '', stringAfter: ''
  });

  const [license, setLicense] = useState({
    key: '',
    status: 'inactive',
    type: '',
    expiresAt: ''
  });
  const [licenseInput, setLicenseInput] = useState('');
  const [licenseError, setLicenseError] = useState('');
  const [isActivating, setIsActivating] = useState(false);

  const dummyKeys = {
    'APT-PRO-1234-5678-9012': { type: 'Professional', expiresAt: '2025-12-31' },
    'APT-BUS-ABCD-EFGH-IJKL': { type: 'Business', expiresAt: '2026-06-15' },
    'APT-ENT-WXYZ-1234-MNOP': { type: 'Enterprise', expiresAt: '2027-01-01' }
  };

  const handleActivateLicense = () => {
    setIsActivating(true);
    setLicenseError('');
    setTimeout(() => {
      if (dummyKeys[licenseInput]) {
        setLicense({
          key: licenseInput,
          status: 'active',
          type: dummyKeys[licenseInput].type,
          expiresAt: dummyKeys[licenseInput].expiresAt
        });
        setLicenseInput('');
      } else {
        setLicenseError('Invalid license key. Please check and try again.');
      }
      setIsActivating(false);
    }, 1500);
  };

  const handleDeactivateLicense = () => {
    setLicense({ key: '', status: 'inactive', type: '', expiresAt: '' });
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Toggle = ({ enabled, onChange }) => (
    <button onClick={() => onChange(!enabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors`} style={{ backgroundColor: enabled ? primaryColor : '#e2e8f0' }}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const Checkbox = ({ checked, onChange, label }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all`} style={{ backgroundColor: checked ? primaryColor : 'white', borderColor: checked ? primaryColor : '#cbd5e1' }}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );

  const SegmentedControl = ({ options, value, onChange }) => (
    <div className="inline-flex bg-slate-100 rounded-lg p-1">
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)} className={`px-3 py-2 text-sm font-medium rounded-md transition-all`} style={{ backgroundColor: value === opt.value ? 'white' : 'transparent', color: value === opt.value ? primaryColor : '#64748b', boxShadow: value === opt.value ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>{opt.label}</button>
      ))}
    </div>
  );

  const AlignmentPicker = ({ value, onChange, options }) => (
    <div className="inline-flex bg-slate-100 rounded-lg p-1 gap-1">
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)} className="p-2.5 rounded-md transition-all" style={{ backgroundColor: value === opt.value ? 'white' : 'transparent', color: value === opt.value ? primaryColor : '#64748b', boxShadow: value === opt.value ? '0 1px 2px rgba(0,0,0,0.05)' : 'none' }}>{opt.icon}</button>
      ))}
    </div>
  );

  const CircularProgress = ({ percentage }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke="#e2e8f0" strokeWidth="8" fill="none" />
          <circle cx="50" cy="50" r={radius} stroke={primaryColor} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-slate-800">{percentage}%</span>
          <span className="text-xs text-slate-500">Coverage</span>
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }) => (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
      {status === 'success' ? 'Completed' : 'Failed'}
    </span>
  );

  const TypeBadge = ({ type }) => {
    const colors = { 'AI Generated': 'bg-teal-50 text-teal-700 border-teal-200', 'From Title': 'bg-sky-50 text-sky-700 border-sky-200', 'Default Image': 'bg-amber-50 text-amber-700 border-amber-200' };
    return <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors[type]}`}>{type}</span>;
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { id: 'image', label: 'Image Settings', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'apis', label: 'External APIs', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  ];

  const horizontalAlignOptions = [
    { value: 'left', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" /></svg> },
    { value: 'center', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M5 18h14" /></svg> },
    { value: 'right', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M6 18h14" /></svg> }
  ];

  const verticalAlignOptions = [
    { value: 'top', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> },
    { value: 'center', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8" /></svg> },
    { value: 'bottom', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> }
  ];

  const getPreviewText = () => {
    let text = 'HELLO WORLD!';
    if (imageSettings.textTransform === 'uppercase') text = text.toUpperCase();
    else if (imageSettings.textTransform === 'lowercase') text = text.toLowerCase();
    return `${imageSettings.stringBefore}${text}${imageSettings.stringAfter}`;
  };

  const getVerticalPosition = () => {
    if (imageSettings.verticalAlign === 'top') return 'items-start';
    if (imageSettings.verticalAlign === 'bottom') return 'items-end';
    return 'items-center';
  };

  const getMethodLabel = (value) => generationMethods.find(m => m.value === value)?.label || 'Generate from title';

  // LICENSE PAGE
  if (currentPage === 'license') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setCurrentPage('dashboard')} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-800">License Management</h1>
                  <p className="text-sm text-slate-500">Activate or manage your Pro license</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-8">
          {license.status === 'inactive' ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 text-center border-b border-slate-100">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: primaryLight }}>
                  <svg className="w-10 h-10" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Activate Your License</h2>
                <p className="text-slate-500">Enter your license key to unlock Pro features</p>
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">License Key</label>
                  <input 
                    type="text" 
                    value={licenseInput}
                    onChange={(e) => setLicenseInput(e.target.value.toUpperCase())}
                    placeholder="APT-XXX-XXXX-XXXX-XXXX"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center font-mono text-lg tracking-wider focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': primaryColor }}
                  />
                  {licenseError && <p className="text-red-500 text-sm mt-2 text-center">{licenseError}</p>}
                </div>
                <button 
                  onClick={handleActivateLicense}
                  disabled={!licenseInput || isActivating}
                  className="w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ backgroundColor: primaryColor }}
                >
                  {isActivating ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Activating...
                    </>
                  ) : 'Activate License'}
                </button>
                <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-600 text-center mb-3">Try these demo keys:</p>
                  <div className="space-y-2">
                    {Object.keys(dummyKeys).map(key => (
                      <button 
                        key={key} 
                        onClick={() => setLicenseInput(key)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6" style={{ background: `linear-gradient(135deg, ${primaryColor}15, ${primaryColor}05)` }}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: primaryLight }}>
                      <svg className="w-8 h-8" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold text-slate-800">{license.type} License</h2>
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full text-white" style={{ backgroundColor: primaryColor }}>Active</span>
                      </div>
                      <p className="text-sm text-slate-500 font-mono">{license.key}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Expires on</p>
                      <p className="text-lg font-semibold text-slate-800">{license.expiresAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-sm font-medium text-white rounded-lg transition" style={{ backgroundColor: primaryColor }}>Renew</button>
                      <button 
                        onClick={handleDeactivateLicense}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-semibold text-slate-800 mb-4">What's included</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['AI Image Generation', 'Google Search', 'Unsplash Integration', 'Pixabay Integration', 'Custom Fonts', 'Priority Support'].map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // DASHBOARD
  if (currentPage === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold text-slate-800">Auto Post Thumbnail</h1>
                    {license.status === 'active' ? (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full text-white" style={{ backgroundColor: primaryColor }}>Pro</span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600">Free</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">Automatically generate featured images</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage('license')} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition" title="License Key">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </button>
                <button onClick={() => setCurrentPage('settings')} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition" title="Settings">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Posts', value: stats.total, bg: 'bg-slate-50', iconBg: 'bg-slate-100', iconColor: 'text-slate-600' },
              { label: 'With Thumbnail', value: stats.withThumbnail, bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
              { label: 'Missing Thumbnail', value: stats.withoutThumbnail, bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
              { label: 'Auto Generated', value: stats.generated, bg: primaryLight, iconBg: primaryLight, iconColor: '' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: i === 3 ? primaryColor : i === 1 ? '#059669' : i === 2 ? '#d97706' : '#475569' }}>{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <svg className={`w-6 h-6 ${stat.iconColor}`} style={i === 3 ? { color: primaryColor } : {}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                      {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
                      {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />}
                      {i === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />}
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-semibold text-slate-800">Quick Actions</h2></div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setIsGenerating(!isGenerating)} className="flex items-center gap-4 p-4 text-white rounded-xl transition shadow-md" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}>
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        {isGenerating ? <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">{isGenerating ? 'Generating...' : 'Generate Thumbnails'}</p>
                        <p className="text-sm opacity-80">For {stats.withoutThumbnail} posts missing images</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-4 p-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Regenerate All</p>
                        <p className="text-sm text-slate-500">Replace existing thumbnails</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800">Recent Activity</h2>
                  <button className="text-sm font-medium" style={{ color: primaryColor }}>View All</button>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{log.title}</p>
                          <p className="text-xs text-slate-500">{log.time} • {log.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <TypeBadge type={log.type} />
                        <StatusBadge status={log.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-semibold text-slate-800">Coverage Overview</h2></div>
                <div className="p-6 flex flex-col items-center">
                  <CircularProgress percentage={stats.percentage} />
                  <div className="mt-6 w-full space-y-3">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }}></div><span className="text-sm text-slate-600">With Thumbnail</span></div><span className="text-sm font-semibold text-slate-800">{stats.withThumbnail}</span></div>
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200"></div><span className="text-sm text-slate-600">Without Thumbnail</span></div><span className="text-sm font-semibold text-slate-800">{stats.withoutThumbnail}</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100"><h2 className="font-semibold text-slate-800">Current Settings</h2></div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">Generation Method</span>
                    <span className="text-sm font-medium text-slate-800">{getMethodLabel(settings.generationMethod)}</span>
                  </div>
                  {[['Image Size', '1200 × 630'], ['Quality', '85%']].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-600">{label}</span>
                      <span className="text-sm font-medium text-slate-800">{value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm text-slate-600">Auto Generate</span>
                    <div className="w-10 h-6 rounded-full relative" style={{ backgroundColor: primaryColor }}><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SETTINGS PAGE
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentPage('dashboard')} className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </button>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-800">Settings</h1>
                <p className="text-sm text-slate-500">Configure Auto Post Thumbnail</p>
              </div>
            </div>
            <button onClick={handleSave} className="px-5 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2 text-white shadow-md" style={{ backgroundColor: saved ? '#10b981' : primaryColor }}>
              {saved ? <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Saved!</> : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-1 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm mb-6">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: activeTab === tab.id ? primaryColor : 'transparent', color: activeTab === tab.id ? 'white' : '#64748b', boxShadow: activeTab === tab.id ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none' }}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-semibold text-slate-800">General Settings</h2>
                <p className="text-sm text-slate-500 mt-0.5">Basic plugin configuration</p>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex-1 pr-8"><h3 className="text-sm font-medium text-slate-800">Add featured image when saving a post</h3><p className="text-sm text-slate-500 mt-1">Automatically add featured image when saving a post</p></div>
                  <Toggle enabled={settings.autoAddOnSave} onChange={(val) => setSettings({...settings, autoAddOnSave: val})} />
                </div>
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex-1 pr-8"><h3 className="text-sm font-medium text-slate-800">Add featured image on a schedule</h3><p className="text-sm text-slate-500 mt-1">Automatically add featured image according to a CRON schedule</p></div>
                  <Toggle enabled={settings.autoAddOnSchedule} onChange={(val) => setSettings({...settings, autoAddOnSchedule: val})} />
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-8"><h3 className="text-sm font-medium text-slate-800">Generation method</h3><p className="text-sm text-slate-500 mt-1">How to generate featured image</p></div>
                    <select value={settings.generationMethod} onChange={(e) => setSettings({...settings, generationMethod: e.target.value})} className="w-64 px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2" style={{ '--tw-ring-color': primaryColor }}>
                      {generationMethods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="mb-4"><h3 className="text-sm font-medium text-slate-800">Generate for post types</h3><p className="text-sm text-slate-500 mt-1">What types of posts to generate images for</p></div>
                  <div className="flex gap-6">
                    <Checkbox checked={settings.postTypes.posts} onChange={(val) => setSettings({...settings, postTypes: {...settings.postTypes, posts: val}})} label="Posts" />
                    <Checkbox checked={settings.postTypes.pages} onChange={(val) => setSettings({...settings, postTypes: {...settings.postTypes, pages: val}})} label="Pages" />
                    <Checkbox checked={settings.postTypes.events} onChange={(val) => setSettings({...settings, postTypes: {...settings.postTypes, events: val}})} label="Events" />
                  </div>
                </div>
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex-1 pr-8"><h3 className="text-sm font-medium text-slate-800">Delete settings when removing the plugin</h3><p className="text-sm text-slate-500 mt-1">Remove all plugin data on uninstallation</p></div>
                  <Toggle enabled={settings.deleteOnUninstall} onChange={(val) => setSettings({...settings, deleteOnUninstall: val})} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-semibold text-slate-800">Import Settings</h2>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex-1 pr-8"><h3 className="text-sm font-medium text-slate-800">Auto images import</h3><p className="text-sm text-slate-500 mt-1">Import post images to the media library</p></div>
                  <Toggle enabled={settings.autoImport} onChange={(val) => setSettings({...settings, autoImport: val})} />
                </div>
                <div className="px-6 py-5">
                  <div className="mb-4"><h3 className="text-sm font-medium text-slate-800">Import for post types</h3></div>
                  <div className="flex gap-6">
                    <Checkbox checked={settings.importPostTypes.posts} onChange={(val) => setSettings({...settings, importPostTypes: {...settings.importPostTypes, posts: val}})} label="Posts" />
                    <Checkbox checked={settings.importPostTypes.pages} onChange={(val) => setSettings({...settings, importPostTypes: {...settings.importPostTypes, pages: val}})} label="Pages" />
                    <Checkbox checked={settings.importPostTypes.events} onChange={(val) => setSettings({...settings, importPostTypes: {...settings.importPostTypes, events: val}})} label="Events" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-semibold text-slate-800">Log Management</h2>
              </div>
              <div className="p-6">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 text-white rounded-lg transition font-medium text-sm" style={{ backgroundColor: primaryColor }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    View Log
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Export Log
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Clean Log
                  </button>
                </div>
                <p className="text-sm text-slate-500 mt-4">Last log entry: 2 minutes ago • Total entries: 1,234</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'image' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="font-semibold text-slate-800">Background & Dimensions</h2>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Background Type</label>
                      <SegmentedControl options={[{ value: 'color', label: 'Color' }, { value: 'image', label: 'Image' }]} value={imageSettings.backgroundType} onChange={(val) => setImageSettings({...imageSettings, backgroundType: val})} />
                    </div>
                    <div>
                      {imageSettings.backgroundType === 'color' ? (
                        <>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Background Color</label>
                          <div className="flex items-center gap-2">
                            <input type="color" value={imageSettings.backgroundColor} onChange={(e) => setImageSettings({...imageSettings, backgroundColor: e.target.value})} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                            <input type="text" value={imageSettings.backgroundColor} onChange={(e) => setImageSettings({...imageSettings, backgroundColor: e.target.value})} className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono" />
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Background Image</label>
                          <div className="flex items-center gap-2">
                            <button className="px-4 py-2 text-sm font-medium text-white rounded-lg" style={{ backgroundColor: primaryColor }}>Select Image</button>
                            <span className="text-sm text-slate-500">JPG, PNG only</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
                      <SegmentedControl options={[{ value: 'jpeg', label: 'JPEG' }, { value: 'png', label: 'PNG' }]} value={imageSettings.imageFormat} onChange={(val) => setImageSettings({...imageSettings, imageFormat: val})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Width</label>
                      <div className="flex items-center gap-2">
                        <input type="number" value={imageSettings.imageWidth} onChange={(e) => setImageSettings({...imageSettings, imageWidth: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
                        <span className="text-sm text-slate-500">px</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Height</label>
                      <div className="flex items-center gap-2">
                        <input type="number" value={imageSettings.imageHeight} onChange={(e) => setImageSettings({...imageSettings, imageHeight: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
                        <span className="text-sm text-slate-500">px</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="font-semibold text-slate-800">Typography</h2>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Font Source</label>
                    <div className="flex gap-2 mb-3">
                      {[{ v: 'preset', l: 'Preset Fonts' }, { v: 'google', l: 'Google Font' }, { v: 'upload', l: 'Upload Font' }].map(o => (
                        <button key={o.v} onClick={() => setFontSource(o.v)} className="px-3 py-2 text-sm font-medium rounded-lg border transition" style={{ backgroundColor: fontSource === o.v ? primaryLight : 'white', borderColor: fontSource === o.v ? primaryColor : '#e2e8f0', color: fontSource === o.v ? primaryColor : '#64748b' }}>{o.l}</button>
                      ))}
                    </div>
                    {fontSource === 'preset' && (
                      <select value={imageSettings.fontName} onChange={(e) => setImageSettings({...imageSettings, fontName: e.target.value})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white">
                        {freeFonts.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    )}
                    {fontSource === 'google' && (
                      <div>
                        <input type="text" value={imageSettings.googleFontUrl} onChange={(e) => setImageSettings({...imageSettings, googleFontUrl: e.target.value})} placeholder="https://fonts.googleapis.com/css2?family=..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
                        <p className="text-xs text-slate-500 mt-1">Paste Google Fonts URL or font name (e.g., "Roboto")</p>
                      </div>
                    )}
                    {fontSource === 'upload' && (
                      <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-slate-300 transition cursor-pointer" style={{ borderColor: primaryLight }}>
                        <svg className="w-8 h-8 mx-auto mb-2" style={{ color: primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <p className="text-sm font-medium text-slate-700">Click to upload font file</p>
                        <p className="text-xs text-slate-500 mt-1">TTF, OTF, WOFF, WOFF2 supported</p>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Size</label>
                      <div className="flex items-center gap-2">
                        <input type="number" value={imageSettings.fontSize} onChange={(e) => setImageSettings({...imageSettings, fontSize: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
                        <span className="text-sm text-slate-500">pt</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
                      <div className="flex items-center gap-2">
                        <input type="color" value={imageSettings.fontColor} onChange={(e) => setImageSettings({...imageSettings, fontColor: e.target.value})} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer" />
                        <input type="text" value={imageSettings.fontColor} onChange={(e) => setImageSettings({...imageSettings, fontColor: e.target.value})} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Transform</label>
                      <SegmentedControl options={[{ value: 'none', label: 'Aa' }, { value: 'uppercase', label: 'AA' }, { value: 'lowercase', label: 'aa' }]} value={imageSettings.textTransform} onChange={(val) => setImageSettings({...imageSettings, textTransform: val})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Max Length</label>
                      <div className="flex items-center gap-2">
                        <input type="number" value={imageSettings.textLength} onChange={(e) => setImageSettings({...imageSettings, textLength: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
                        <span className="text-sm text-slate-500">chars</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Line Height</label>
                      <input type="number" step="0.1" value={imageSettings.lineSpacing} onChange={(e) => setImageSettings({...imageSettings, lineSpacing: parseFloat(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div><h3 className="text-sm font-medium text-slate-800">Text Shadow</h3><p className="text-xs text-slate-500">Add shadow behind text</p></div>
                    <div className="flex items-center gap-3">
                      {imageSettings.textShadow && <input type="color" value={imageSettings.shadowColor} onChange={(e) => setImageSettings({...imageSettings, shadowColor: e.target.value})} className="w-8 h-8 rounded border border-slate-200 cursor-pointer" />}
                      <Toggle enabled={imageSettings.textShadow} onChange={(val) => setImageSettings({...imageSettings, textShadow: val})} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="font-semibold text-slate-800">Layout & Text Additions</h2>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className="block text-sm font-medium text-slate-700 mb-3">Horizontal</label><AlignmentPicker options={horizontalAlignOptions} value={imageSettings.horizontalAlign} onChange={(val) => setImageSettings({...imageSettings, horizontalAlign: val})} /></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-3">Vertical</label><AlignmentPicker options={verticalAlignOptions} value={imageSettings.verticalAlign} onChange={(val) => setImageSettings({...imageSettings, verticalAlign: val})} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Vertical Padding</label><div className="flex items-center gap-2"><input type="number" value={imageSettings.paddingTopBottom} onChange={(e) => setImageSettings({...imageSettings, paddingTopBottom: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" /><span className="text-sm text-slate-500">px</span></div></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Horizontal Padding</label><div className="flex items-center gap-2"><input type="number" value={imageSettings.paddingLeftRight} onChange={(e) => setImageSettings({...imageSettings, paddingLeftRight: parseInt(e.target.value)})} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" /><span className="text-sm text-slate-500">px</span></div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Text Before</label><input type="text" value={imageSettings.stringBefore} onChange={(e) => setImageSettings({...imageSettings, stringBefore: e.target.value})} placeholder="Prefix..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" /><p className="text-xs text-slate-500 mt-1">Use [br] for line break</p></div>
                    <div><label className="block text-sm font-medium text-slate-700 mb-2">Text After</label><input type="text" value={imageSettings.stringAfter} onChange={(e) => setImageSettings({...imageSettings, stringAfter: e.target.value})} placeholder="Suffix..." className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm" /><p className="text-xs text-slate-500 mt-1">Use [br] for line break</p></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sticky top-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50"><h2 className="font-semibold text-slate-800">Live Preview</h2></div>
                <div className="p-6">
                  <div className={`relative rounded-xl overflow-hidden flex ${getVerticalPosition()}`} style={{ width: '100%', aspectRatio: `${imageSettings.imageWidth} / ${imageSettings.imageHeight}`, backgroundColor: imageSettings.backgroundType === 'color' ? imageSettings.backgroundColor : '#1a1a2e' }}>
                    {imageSettings.backgroundType === 'image' && <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="" />}
                    <div className="relative z-10 w-full font-bold" style={{ color: imageSettings.fontColor, fontSize: `${Math.min(imageSettings.fontSize, 20)}px`, textShadow: imageSettings.textShadow ? `2px 2px 4px ${imageSettings.shadowColor}` : 'none', lineHeight: imageSettings.lineSpacing, textAlign: imageSettings.horizontalAlign, padding: `${imageSettings.paddingTopBottom}px ${imageSettings.paddingLeftRight}px`, textTransform: imageSettings.textTransform === 'none' ? 'none' : imageSettings.textTransform, fontFamily: imageSettings.fontName }}>
                      {getPreviewText()}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                    <span>{imageSettings.imageWidth} × {imageSettings.imageHeight}px</span>
                    <span className="uppercase">{imageSettings.imageFormat}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border p-5" style={{ backgroundColor: primaryLight, borderColor: `${primaryColor}40` }}>
                <h3 className="font-medium mb-2" style={{ color: primaryDark }}>💡 Pro Tips</h3>
                <ul className="text-sm space-y-1" style={{ color: primaryDark }}>
                  <li>• Use 1200×630 for social sharing</li>
                  <li>• High contrast improves readability</li>
                  <li>• Keep text under 50 characters</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'apis' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-800">External APIs</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Connect to external image services</p>
                  </div>
                  <a href="#" className="text-sm font-medium flex items-center gap-1.5 hover:underline" style={{ color: primaryColor }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    How to get API keys
                  </a>
                </div>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#ea433515' }}>
                      <svg className="w-5 h-5" style={{ color: '#ea4335' }} viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    </div>
                    <div><h3 className="font-medium text-slate-800">Google Custom Search</h3><p className="text-xs text-slate-500">Search images from Google</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">API Key</label>
                      <input type="text" placeholder="Enter API Key" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Search Engine ID</label>
                      <input type="text" placeholder="Enter Search Engine ID" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-50">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <div><h3 className="font-medium text-slate-800">Pixabay</h3><p className="text-xs text-slate-500">Free stock photos</p></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">API Key</label>
                    <input type="text" placeholder="Enter API Key" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100">
                      <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 6.75V0h9v6.75h-9zm9 3.75H24V24H0V10.5h7.5v6.75h9V10.5z"/></svg>
                    </div>
                    <div><h3 className="font-medium text-slate-800">Unsplash</h3><p className="text-xs text-slate-500">Beautiful free images</p></div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Access Key</label>
                    <input type="text" placeholder="Enter Access Key" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                  </div>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    </div>
                    <div><h3 className="font-medium text-slate-800">IBM Watson</h3><p className="text-xs text-slate-500">AI-powered recognition</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">API Key</label>
                      <input type="text" placeholder="Enter API Key" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Endpoint URL</label>
                      <input type="text" placeholder="Enter Endpoint URL" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;