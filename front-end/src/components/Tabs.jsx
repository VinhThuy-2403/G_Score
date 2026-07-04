const Tabs = ({ tabs, activeTab, onTabChange }) => (
  <div className="tabs" role="tablist">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        id={`tab-${tab.id}`}
        role="tab"
        aria-selected={activeTab === tab.id}
        className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default Tabs;
