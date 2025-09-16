import React, { useState, useEffect } from 'react';
import { 
  Folder,
  FolderOpen,
  Files,
  FolderX,
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Star,
  Lock,
  Scissors,
  Clipboard,
  Palette,
  ArrowUpDown,
  Eye,
  Crown,
  Check,
  X,
  Info,
  Save,
  Download,
  ChevronsUpDown
} from 'lucide-react';

const MediaOrganizerSidebar = () => {
  // Custom SVG components
  const ChevronsDownUpIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m7 20 5-5 5 5"/>
      <path d="m7 4 5 5 5-5"/>
    </svg>
  );

  const ChevronsUpDownIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m7 15 5 5 5-5"/>
      <path d="m7 9 5-5 5 5"/>
    </svg>
  );

  const SettingsIcon = ({ className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const [selectedFolder, setSelectedFolder] = useState('all-files');
  const [folderSearchTerm, setFolderSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState({ 
    'new-folder2': true
  });
  const [folderContextMenu, setFolderContextMenu] = useState(null);
  const [showProModal, setShowProModal] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showProperties, setShowProperties] = useState(false);
  const [selectedFolderForProperties, setSelectedFolderForProperties] = useState(null);
  const [showListColumnsModal, setShowListColumnsModal] = useState(false);

  const [settings, setSettings] = useState({
    defaultStartupFolder: 'all-files',
    infiniteScrollGrid: false,
    gridSize: 'medium'
  });

  const [viewOptions, setViewOptions] = useState({
    showFileCounts: true,
    showEmptyFolders: true
  });

  const [listColumns, setListColumns] = useState({
    treeViewIcon: true,
    author: true,
    mediaCategories: true,
    uploadedTo: true,
    comments: true,
    date: true,
    altText: false,
    caption: false,
    description: false,
    slug: false,
    fileType: false,
    fileMIME: false,
    fileSize: false,
    dimensions: false,
    width: false
  });

  // Folder structure
  const [folders, setFolders] = useState([
    {
      id: 'all-files',
      name: 'All Files',
      type: 'all',
      count: 47,
      parent: null,
      color: 'default',
      starred: false,
      locked: false
    },
    {
      id: 'uncategorized',
      name: 'Uncategorized',
      type: 'uncategorized',
      count: 42,
      parent: null,
      color: 'default',
      starred: false,
      locked: false
    },
    {
      id: 'new-folder2',
      name: 'New Folder2',
      type: 'folder',
      count: 3,
      parent: null,
      color: 'blue',
      starred: true,
      locked: false,
      children: [
        {
          id: 'new-folder3',
          name: 'New Folder3',
          type: 'folder',
          count: 0,
          parent: 'new-folder2',
          color: 'green',
          starred: false,
          locked: false,
          children: [
            {
              id: 'new-folder4',
              name: 'New Folder4',
              type: 'folder',
              count: 0,
              parent: 'new-folder3',
              color: 'purple',
              starred: false,
              locked: true
            }
          ]
        }
      ]
    },
    {
      id: 'new-folder',
      name: 'New Folder',
      type: 'folder',
      count: 0,
      parent: null,
      color: 'orange',
      starred: false,
      locked: false
    },
    {
      id: 'tesic',
      name: 'tesic',
      type: 'folder',
      count: 2,
      parent: null,
      color: 'red',
      starred: false,
      locked: false
    }
  ]);

  const getFolderIcon = (folder, isExpanded = false) => {
    if (folder.type === 'all') return Files;
    if (folder.type === 'uncategorized') return FolderX;
    if (folder.children && folder.children.length > 0) {
      return isExpanded ? FolderOpen : Folder;
    }
    return Folder;
  };

  const getFolderColor = (folder) => {
    const colors = {
      default: 'text-blue-600',
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600'
    };
    return colors[folder.color] || colors.default;
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const handleFolderContextMenu = (e, folder) => {
    e.preventDefault();
    e.stopPropagation();
    setFolderContextMenu({
      x: e.clientX,
      y: e.clientY,
      folder: folder
    });
  };

  const handleProFeatureClick = () => {
    setShowProModal(true);
    setFolderContextMenu(null);
  };

  const handleReorderFolders = () => {
    setShowProModal(true);
  };

  const handleDeleteAction = () => {
    if (bulkMode && selectedFolders.length > 0) {
      console.log('Deleting selected folders:', selectedFolders);
      setSelectedFolders([]);
    } else {
      console.log('Deleting selected folder:', selectedFolder);
    }
  };

  const handleDownloadFolder = (folder) => {
    console.log('Downloading folder:', folder.name);
    alert(`Starting download of "${folder.name}" folder with ${folder.count} files...`);
    setFolderContextMenu(null);
  };

  const collapseAllFolders = () => {
    setExpandedFolders({});
    setShowMoreMenu(false);
  };

  const expandAllFolders = () => {
    const allFolderIds = {};
    const addFolderIds = (folderList) => {
      folderList.forEach(folder => {
        if (folder.children && folder.children.length > 0) {
          allFolderIds[folder.id] = true;
          addFolderIds(folder.children);
        }
      });
    };
    addFolderIds(folders);
    setExpandedFolders(allFolderIds);
    setShowMoreMenu(false);
  };

  const createNewFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: newFolderName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
        name: newFolderName.trim(),
        type: 'folder',
        count: 0,
        parent: null,
        color: 'default',
        starred: false,
        locked: false
      };
      
      setFolders(prev => [...prev, newFolder]);
      setNewFolderName('');
      setShowAddForm(false);
    }
  };

  const getAllFoldersFlat = (folderList) => {
    let result = [];
    folderList.forEach(folder => {
      result.push(folder);
      if (folder.children) {
        result = result.concat(getAllFoldersFlat(folder.children));
      }
    });
    return result;
  };

  const saveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
    setShowSettings(false);
  };

  // Tree connector component
  const TreeConnector = ({ level, isLast, hasChildren }) => {
    if (level === 0) return null;
    
    return (
      <div className="flex items-center h-full absolute left-0" style={{ width: `${level * 16}px` }}>
        {Array.from({ length: level - 1 }).map((_, i) => (
          <div key={i} className="w-4 flex justify-center">
            <div className="w-px bg-gray-300" style={{ height: '32px' }} />
          </div>
        ))}
        <div className="w-4 flex items-center">
          <div 
            className="border-l border-b border-gray-300" 
            style={{ 
              width: '8px', 
              height: '16px',
              borderBottomLeftRadius: '2px'
            }} 
          />
          {!isLast && (
            <div 
              className="w-px bg-gray-300 absolute" 
              style={{ 
                height: '16px',
                top: '16px',
                left: '7px'
              }} 
            />
          )}
        </div>
      </div>
    );
  };

  const FolderTreeItem = ({ folder, level = 0, isLast = false, allFolders = [] }) => {
    const hasChildren = folder.children && folder.children.length > 0;
    const isExpanded = expandedFolders[folder.id];
    const isSelected = selectedFolder === folder.id;
    const Icon = getFolderIcon(folder, isExpanded);
    const isInBulkSelection = selectedFolders.includes(folder.id);
    const matchesSearch = folder.name.toLowerCase().includes(folderSearchTerm.toLowerCase());
    const shouldShowEmpty = viewOptions.showEmptyFolders || folder.count > 0;
    
    if (!matchesSearch || !shouldShowEmpty) {
      return null;
    }

    const parentFolder = allFolders.find(f => f.id === folder.parent);
    const siblings = parentFolder ? parentFolder.children : allFolders.filter(f => !f.parent);
    const currentIndex = siblings ? siblings.findIndex(f => f.id === folder.id) : 0;
    const isLastSibling = currentIndex === (siblings ? siblings.length - 1 : 0);

    return (
      <div>
        <div
          className={`group relative flex items-center py-2 px-3 text-sm cursor-pointer transition-colors ${
            isSelected 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setSelectedFolder(folder.id)}
          onContextMenu={(e) => handleFolderContextMenu(e, folder)}
        >
          <TreeConnector level={level} isLast={isLastSibling} hasChildren={hasChildren} />
          
          <div className="flex items-center flex-1" style={{ marginLeft: level * 16 }}>
            {bulkMode && folder.type === 'folder' && (
              <input
                type="checkbox"
                checked={isInBulkSelection}
                onChange={(e) => {
                  e.stopPropagation();
                  if (e.target.checked) {
                    setSelectedFolders(prev => [...prev, folder.id]);
                  } else {
                    setSelectedFolders(prev => prev.filter(id => id !== folder.id));
                  }
                }}
                className="w-4 h-4 mr-2 rounded border-gray-300 text-blue-600"
              />
            )}

            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(folder.id);
                }}
                className={`p-0.5 hover:bg-gray-200 rounded mr-1 ${
                  isSelected ? 'hover:bg-blue-500' : ''
                }`}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            )}
            {!hasChildren && <div className="w-4 mr-1" />}
            
            <Icon className={`w-4 h-4 mr-2 ${
              isSelected ? 'text-white' : getFolderColor(folder)
            }`} />
            
            <span className="flex-1 truncate font-medium">{folder.name}</span>
            
            {viewOptions.showFileCounts && (
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                isSelected 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {folder.count}
              </span>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {folder.children.map((child, index) => (
              <FolderTreeItem 
                key={child.id} 
                folder={child} 
                level={level + 1}
                isLast={index === folder.children.length - 1}
                allFolders={folders}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const FolderContextMenu = () => {
    if (!folderContextMenu) return null;

    const contextMenuItems = [
      { id: 'rename', label: 'Rename', icon: Edit2, isPro: false },
      { id: 'delete', label: 'Delete', icon: Trash2, isPro: false },
      { id: 'download', label: 'Download', icon: Download, isPro: false },
      { id: 'addchild', label: 'Add Child Folder', icon: Plus, isPro: false },
      { id: 'properties', label: 'Properties', icon: Info, isPro: false },
      { id: 'separator1', type: 'separator' },
      { id: 'merge', label: 'Merge Folder', icon: Folder, isPro: true }
    ];

    const handleContextMenuClick = (itemId) => {
      const folder = folderContextMenu.folder;
      
      switch (itemId) {
        case 'rename':
          console.log('Renaming folder:', folder.name);
          alert(`Rename "${folder.name}" - functionality to be implemented`);
          break;
        case 'delete':
          console.log('Deleting folder:', folder.name);
          alert(`Delete "${folder.name}" - functionality to be implemented`);
          break;
        case 'download':
          handleDownloadFolder(folder);
          return;
        case 'addchild':
          console.log('Adding child folder to:', folder.name);
          alert(`Add child folder to "${folder.name}" - functionality to be implemented`);
          break;
        case 'properties':
          setSelectedFolderForProperties(folder);
          setShowProperties(true);
          break;
        case 'merge':
          handleProFeatureClick();
          return;
        default:
          break;
      }
      setFolderContextMenu(null);
    };

    return (
      <div 
        className="fixed z-50 bg-white border border-gray-200 shadow-lg py-1 min-w-[160px] rounded"
        style={{ left: folderContextMenu.x, top: folderContextMenu.y }}
      >
        {contextMenuItems.map((item) => {
          if (item.type === 'separator') {
            return <div key={item.id} className="border-t border-gray-200 my-1" />;
          }

          const Icon = item.icon;
          const isProFeature = item.isPro;
          
          return (
            <button
              key={item.id}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-600 hover:text-white flex items-center justify-between ${
                isProFeature ? 'text-gray-400' : 'text-gray-700'
              }`}
              onClick={() => handleContextMenuClick(item.id)}
            >
              <div className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </div>
              {isProFeature && <Crown className="w-3 h-3 text-orange-500" />}
            </button>
          );
        })}
      </div>
    );
  };

  const PropertiesModal = () => {
    if (!showProperties || !selectedFolderForProperties) return null;

    const folder = selectedFolderForProperties;
    
    const getTotalFiles = (folderData) => {
      let total = folderData.count || 0;
      if (folderData.children) {
        folderData.children.forEach(child => {
          total += getTotalFiles(child);
        });
      }
      return total;
    };

    const totalFiles = getTotalFiles(folder);
    const directFiles = folder.count || 0;
    const hasSubfolders = folder.children && folder.children.length > 0;
    const createdDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const lastModified = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Folder Properties</h3>
            <button
              onClick={() => {
                setShowProperties(false);
                setSelectedFolderForProperties(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-3 rounded-lg ${
                folder.color === 'blue' ? 'bg-blue-100' :
                folder.color === 'green' ? 'bg-green-100' :
                folder.color === 'purple' ? 'bg-purple-100' :
                folder.color === 'orange' ? 'bg-orange-100' :
                folder.color === 'red' ? 'bg-red-100' :
                'bg-blue-100'
              }`}>
                <Folder className={`w-8 h-8 ${getFolderColor(folder)}`} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{folder.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{folder.type} folder</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{directFiles}</div>
                <div className="text-sm text-gray-600">Direct Files</div>
              </div>
              
              {hasSubfolders && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{totalFiles}</div>
                  <div className="text-sm text-gray-600">Total Files</div>
                </div>
              )}
              
              {hasSubfolders && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{folder.children.length}</div>
                  <div className="text-sm text-gray-600">Subfolders</div>
                </div>
              )}
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 capitalize">{folder.color}</div>
                <div className="text-sm text-gray-600">Color</div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Created:</span>
                <span className="text-sm text-gray-600">{createdDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Last modified:</span>
                <span className="text-sm text-gray-600">{lastModified.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">Type:</span>
                <span className="text-sm text-gray-600">{folder.type === 'all' ? 'System folder' : 'Custom folder'}</span>
              </div>
              {folder.parent && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Parent folder:</span>
                  <span className="text-sm text-gray-600">
                    {folders.find(f => f.id === folder.parent)?.name || 'Unknown'}
                  </span>
                </div>
              )}
            </div>

            {(folder.starred || folder.locked) && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  {folder.starred && (
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">Starred</span>
                    </div>
                  )}
                  {folder.locked && (
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Locked</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
              onClick={() => {
                setShowProperties(false);
                setSelectedFolderForProperties(null);
              }}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center justify-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SettingsModal = () => {
    if (!showSettings) return null;

    const allFolders = getAllFoldersFlat(folders);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Startup Folder
              </label>
              <select
                value={settings.defaultStartupFolder}
                onChange={(e) => setSettings(prev => ({ ...prev, defaultStartupFolder: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {allFolders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Infinite Scroll on Grid View 
                </span>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, infiniteScrollGrid: !prev.infiniteScrollGrid }))}
                  className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.infiniteScrollGrid ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition-transform ${
                      settings.infiniteScrollGrid ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grid Size
              </label>
              <select
                value={settings.gridSize}
                onChange={(e) => setSettings(prev => ({ ...prev, gridSize: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="thumbnail">Thumbnail</option>
                <option value="medium">Medium</option>
                <option value="medium_large">Medium Large</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                List Columns
              </label>
              <button
                onClick={() => setShowListColumnsModal(true)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-left hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">Manage Columns</div>
                    <div className="text-sm text-gray-600">
                      {Object.values(listColumns).filter(Boolean).length} columns enabled
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Show File Counts
                </span>
                <button
                  onClick={() => setViewOptions(prev => ({ ...prev, showFileCounts: !prev.showFileCounts }))}
                  className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    viewOptions.showFileCounts ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition-transform ${
                      viewOptions.showFileCounts ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Show Empty Folders
                </span>
                <button
                  onClick={() => setViewOptions(prev => ({ ...prev, showEmptyFolders: !prev.showEmptyFolders }))}
                  className={`relative inline-flex w-12 h-6 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    viewOptions.showEmptyFolders ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-5 h-5 transform rounded-full bg-white shadow-lg transition-transform ${
                      viewOptions.showEmptyFolders ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
            <button
              onClick={saveSettings}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProModal = () => {
    if (!showProModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 mb-6">
              This feature is available in Media Library Organizer Pro. Upgrade to unlock advanced folder management capabilities.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowProModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded hover:from-orange-600 hover:to-orange-700">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('[data-more-menu]')) {
        setFolderContextMenu(null);
        setShowMoreMenu(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const filteredFolders = folders.filter(folder => {
    if (!folder.parent) {
      const matchesSearch = folder.name.toLowerCase().includes(folderSearchTerm.toLowerCase());
      const shouldShowEmpty = viewOptions.showEmptyFolders || folder.count > 0;
      return matchesSearch && shouldShowEmpty;
    }
    return true;
  });

  return (
    <div className="w-72 bg-white border border-gray-300 shadow-sm min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-300 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-900">Media Library Organizer</h2>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Control Group */}
        <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded p-1 mb-3">
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Folder
          </button>
          <button 
            onClick={handleReorderFolders}
            className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
            title="Reorder Folders"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            onClick={expandAllFolders}
            className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
            title="Expand All"
          >
            <ChevronsDownUpIcon className="w-4 h-4" />
          </button>
          <button
            onClick={collapseAllFolders}
            className="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded"
            title="Collapse All"
          >
            <ChevronsUpDownIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button className="flex-1 bg-white border border-gray-300 text-gray-700 px-2 py-2 text-xs rounded hover:bg-gray-50 whitespace-nowrap">
            Rename
          </button>
          <button 
            onClick={handleDeleteAction}
            className="flex-1 bg-white border border-gray-300 text-gray-700 px-2 py-2 text-xs rounded hover:bg-gray-50 whitespace-nowrap"
          >
            Delete {bulkMode && selectedFolders.length > 0 && `(${selectedFolders.length})`}
          </button>
          <button
            onClick={() => setBulkMode(!bulkMode)}
            className={`flex-1 px-2 py-2 text-xs rounded whitespace-nowrap ${
              bulkMode 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Bulk select
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded">
            <input
              type="text"
              placeholder="Folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 mb-2"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  createNewFolder();
                }
              }}
            />
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewFolderName('');
                }}
                className="flex-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={createNewFolder}
                className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Folder Search */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter folder name..."
            value={folderSearchTerm}
            onChange={(e) => setFolderSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Folder Tree */}
      <div className="flex-1 overflow-y-auto">
        {filteredFolders.map((folder, index, array) => (
          <FolderTreeItem 
            key={folder.id} 
            folder={folder}
            isLast={index === array.length - 1}
            allFolders={folders}
          />
        ))}
      </div>

      {/* Context Menu */}
      <FolderContextMenu />
      
      {/* Properties Modal */}
      <PropertiesModal />
      
      {/* Settings Modal */}
      <SettingsModal />
      
      {/* List Columns Modal */}
      {showListColumnsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Manage List Columns</h3>
              <button
                onClick={() => setShowListColumnsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                {[
                  { key: 'treeViewIcon', label: 'Tree View: Categorize / Move Icon' },
                  { key: 'author', label: 'Author' },
                  { key: 'mediaCategories', label: 'Media Categories' },
                  { key: 'uploadedTo', label: 'Uploaded to' },
                  { key: 'comments', label: 'Comments' },
                  { key: 'date', label: 'Date' },
                  { key: 'altText', label: 'Alt Text' },
                  { key: 'caption', label: 'Caption' },
                  { key: 'description', label: 'Description' },
                  { key: 'slug', label: 'Slug' },
                  { key: 'fileType', label: 'File Type' },
                  { key: 'fileMIME', label: 'File MIME' },
                  { key: 'fileSize', label: 'File Size' },
                  { key: 'dimensions', label: 'Dimensions' },
                  { key: 'width', label: 'Width' }
                ].map((column) => (
                  <label key={column.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={listColumns[column.key]}
                      onChange={() => setListColumns(prev => ({
                        ...prev,
                        [column.key]: !prev[column.key]
                      }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm text-gray-700">{column.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex space-x-3">
              <button
                onClick={() => setShowListColumnsModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Saving list columns:', listColumns);
                  setShowListColumnsModal(false);
                }}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Pro Modal */}
      <ProModal />
      
      {/* Pro Upgrade Banner */}
      <div className="border-t border-gray-300 bg-gradient-to-r from-orange-50 to-orange-100 p-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Crown className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-sm font-semibold text-orange-800">Media Library Organizer Pro</h3>
          </div>
          <p className="text-xs text-orange-700 mb-3 leading-relaxed">
            Unlock advanced features like bulk operations, smart categorization, and enhanced folder management.
          </p>
          <a 
            href="https://wpmediafolders.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Upgrade Now
          </a>
          <div className="mt-2">
            <a 
              href="https://wpmediafolders.com/features" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-orange-600 hover:text-orange-800 underline"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaOrganizerSidebar;