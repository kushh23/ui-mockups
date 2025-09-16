let currentTab = 'core';

function switchTab(tabName) {
    document.getElementById('coreContent').style.display = 'none';
    document.getElementById('advancedContent').style.display = 'none';
    document.getElementById('defaultsContent').style.display = 'none';
    document.getElementById('optimizationContent').style.display = 'none';

    document.getElementById('coreTab').classList.remove('active');
    document.getElementById('advancedTab').classList.remove('active');
    document.getElementById('defaultsTab').classList.remove('active');
    document.getElementById('optimizationTab').classList.remove('active');

    if (tabName === 'core') {
        document.getElementById('coreContent').style.display = 'block';
        document.getElementById('coreTab').classList.add('active');
    } else if (tabName === 'advanced') {
        document.getElementById('advancedContent').style.display = 'block';
        document.getElementById('advancedTab').classList.add('active');
    } else if (tabName === 'defaults') {
        document.getElementById('defaultsContent').style.display = 'block';
        document.getElementById('defaultsTab').classList.add('active');
    } else if (tabName === 'optimization') {
        document.getElementById('optimizationContent').style.display = 'block';
        document.getElementById('optimizationTab').classList.add('active');
    }

    currentTab = tabName;
}

function toggleSection(toggle) {
    toggle.classList.toggle('enabled');

    if (toggle.id === 'autoCategorizationToggle') {
        const settings = document.getElementById('autoCategorizationSettings');
        if (toggle.classList.contains('enabled')) {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    } else if (toggle.id === 'aiToggle') {
        const settings = document.getElementById('aiSettings');
        if (toggle.classList.contains('enabled')) {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    } else if (toggle.id === 'exifToggle') {
        const settings = document.getElementById('exifSettings');
        if (toggle.classList.contains('enabled')) {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    } else if (toggle.id === 'zipSettingsToggle') {
        const settings = document.getElementById('zipSettingsAdvanced');
        if (toggle.classList.contains('enabled')) {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    } else if (toggle.id === 'zipFolderToggle') {
        const settings = document.getElementById('zipFolderSettings');
        if (toggle.classList.contains('enabled')) {
            settings.style.display = 'block';
        } else {
            settings.style.display = 'none';
        }
    } else if (toggle.id === 'defaultsToggle') {
        const settings = document.getElementById('defaultsSettingsSection');
        const headerSection = document.getElementById('defaultsHeaderSection');
        if (settings) {
            if (toggle.classList.contains('enabled')) {
                settings.style.display = 'block';
                if (headerSection) {
                    headerSection.style.borderBottom = '1px solid #f0f0f1';
                    headerSection.style.marginBottom = '20px';
                    headerSection.style.paddingBottom = '20px';
                }
            } else {
                settings.style.display = 'none';
                if (headerSection) {
                    headerSection.style.borderBottom = 'none';
                    headerSection.style.marginBottom = '12px';
                    headerSection.style.paddingBottom = '0';
                }
            }
        }
    }
}

function toggleQualitySettings(toggle) {
    toggle.classList.toggle('enabled');
    const qualitySettings = document.getElementById('qualitySettings');
    if (toggle.classList.contains('enabled')) {
        qualitySettings.style.display = 'block';
    } else {
        qualitySettings.style.display = 'none';
    }
}

function openAssetModal() {
    document.getElementById('assetModal').style.display = 'block';
}

function closeAssetModal() {
    document.getElementById('assetModal').style.display = 'none';
}

function saveAssetSettings() {
    closeAssetModal();
    showSuccessMessage('File type settings saved successfully!');
}

function showAddTaxonomyForm() {
    const form = document.getElementById('addTaxonomyForm');
    const btn = document.getElementById('addTaxonomyBtn');
    if (form && btn) {
        form.style.display = 'block';
        btn.style.display = 'none';
    }
}

function cancelAddTaxonomy() {
    const form = document.getElementById('addTaxonomyForm');
    const btn = document.getElementById('addTaxonomyBtn');
    if (form && btn) {
        form.style.display = 'none';
        btn.style.display = 'inline-flex';
        document.getElementById('pluralName').value = '';
        document.getElementById('singularName').value = '';
        document.getElementById('hierarchical').value = 'yes';
        document.getElementById('enabled').value = 'yes';
    }
}

function saveTaxonomy() {
    const pluralName = document.getElementById('pluralName').value;
    const singularName = document.getElementById('singularName').value;
    const hierarchical = document.getElementById('hierarchical').value;
    const enabled = document.getElementById('enabled').value;

    if (!pluralName || !singularName) {
        alert('Please fill in both name fields');
        return;
    }

    const tableBody = document.getElementById('taxonomyTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td style="padding: 12px; border: 1px solid #ccd0d4;">${pluralName}</td>
        <td style="padding: 12px; border: 1px solid #ccd0d4;">${singularName}</td>
        <td style="padding: 12px; border: 1px solid #ccd0d4;">${hierarchical === 'yes' ? 'Yes' : 'No'}</td>
        <td style="padding: 12px; border: 1px solid #ccd0d4;">${enabled === 'yes' ? 'Yes' : 'No'}</td>
        <td style="padding: 12px; border: 1px solid #ccd0d4;">
            <button class="btn btn-secondary" onclick="deleteTaxonomy(this)" style="padding: 4px 8px; font-size: 12px; color: #d63638; border-color: #d63638;">Delete</button>
        </td>
    `;

    tableBody.appendChild(newRow);
    cancelAddTaxonomy();
    showSuccessMessage('Taxonomy added successfully!');
}

function deleteTaxonomy(button) {
    if (confirm('Are you sure you want to delete this taxonomy?')) {
        const row = button.closest('tr');
        if (row) {
            row.remove();
            showSuccessMessage('Taxonomy deleted successfully!');
        }
    }
}

function toggleExifMatrix() {
    const exifMatrix = document.getElementById('exifMatrix');
    const iptcMatrix = document.getElementById('iptcMatrix');
    
    iptcMatrix.style.display = 'none';
    
    if (exifMatrix.style.display === 'none' || !exifMatrix.style.display) {
        exifMatrix.style.display = 'block';
    } else {
        exifMatrix.style.display = 'none';
    }
}

function toggleIptcMatrix() {
    const exifMatrix = document.getElementById('exifMatrix');
    const iptcMatrix = document.getElementById('iptcMatrix');
    
    exifMatrix.style.display = 'none';
    
    if (iptcMatrix.style.display === 'none' || !iptcMatrix.style.display) {
        iptcMatrix.style.display = 'block';
    } else {
        iptcMatrix.style.display = 'none';
    }
}

function showSuccessMessage(message) {
    const statusMessage = document.createElement('div');
    statusMessage.textContent = message;
    statusMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00a32a;
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-weight: 500;
        z-index: 1001;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;
    document.body.appendChild(statusMessage);

    setTimeout(() => {
        if (document.body.contains(statusMessage)) {
            document.body.removeChild(statusMessage);
        }
    }, 3000);
}

window.onclick = function(event) {
    const assetModal = document.getElementById('assetModal');
    if (event.target === assetModal) {
        closeAssetModal();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    switchTab('core');
});

function switchDefaultsTab(tabName) {
    const sections = [
        'images',
        'videos',
        'audio',
        'text',
        'documents',
        'spreadsheets',
        'presentations',
        'archives',
        'other'
    ];

    sections.forEach(name => {
        const btn = document.getElementById(`defaultsTab-${name}`);
        const panel = document.getElementById(`defaultsPanel-${name}`);
        if (btn) {
            btn.classList.remove('active');
        }
        if (panel) {
            panel.style.display = 'none';
        }
    });

    const activeBtn = document.getElementById(`defaultsTab-${tabName}`);
    const activePanel = document.getElementById(`defaultsPanel-${tabName}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    if (activePanel) {
        activePanel.style.display = 'block';
    }
}

function toggleMultiSelect(triggerEl) {
    const wrapper = triggerEl.closest('.multi-select');
    if (!wrapper) return;
    const panel = wrapper.querySelector('.multi-select-panel');
    if (!panel) return;
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
}

function updateMultiSelectLabel(checkboxEl) {
    const wrapper = checkboxEl.closest('.multi-select');
    if (!wrapper) return;
    const labelEl = wrapper.querySelector('.multi-select-label');
    const options = Array.from(wrapper.querySelectorAll('.multi-select-panel input[type="checkbox"]'));
    const selected = options
        .map((cb, idx) => ({ cb, text: cb.nextElementSibling ? cb.nextElementSibling.textContent : '' }))
        .filter(o => o.cb.checked)
        .map(o => o.text.trim())
        .filter(Boolean);
    labelEl.textContent = selected.length ? selected.join(', ') : 'Select folders';
}

// Close open multi-select when clicking outside
document.addEventListener('click', function(e) {
    const isTrigger = e.target.closest('.multi-select-trigger');
    const isPanel = e.target.closest('.multi-select-panel');
    if (isTrigger || isPanel) return;
    document.querySelectorAll('.multi-select-panel').forEach(p => p.style.display = 'none');
});


