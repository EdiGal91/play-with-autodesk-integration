const TABLE_TABS = {
    'PROJECTS': {
        'REQUEST_URL': '/api/admin/projects',
        'TAB_NAME': 'PROJECTS',
        'CATEGORY_NAME': 'hub',
        'CATEGORY_DEFAULT': true
    },
    'PROJECT': {
        'REQUEST_URL': '/api/admin/project',
        'TAB_NAME': 'PROJECT',
        'CATEGORY_NAME': 'project',
        'CATEGORY_DEFAULT': true
    },
    'USERS': {
        'REQUEST_URL': '/api/admin/project/users',
        'TAB_NAME': 'USERS',
        'CATEGORY_NAME': 'project',
        'CATEGORY_DEFAULT': false
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Table class wraps the specific data info
class Table {
    #tableId;
    #accountId;
    #projectId;
    #tabKey;
    #dataSet;
    #maxItem;

    constructor(tableId, accountId = null, projectId = null, tabKey = 'PROJECTS') {
        this.#tableId = tableId;
        this.#accountId = accountId;
        this.#projectId = projectId;
        this.#tabKey = tabKey;
        this.#dataSet = null;
        this.#maxItem = 5;
    };

    get tabKey() {
        return this.#tabKey;
    }

    set tabKey(tabKey) {
        this.#tabKey = tabKey;
    }

    resetData = async (tabKey = null, accountId = null, projectId = null) => {
        //TBD
    }

    drawTable = () => {
        //TBD
    }

    exportToCSV = () => {
        //TBD
    }

    importFromCSV = async () => {
        //TBD
    }
}


export async function refreshTable(accountId = null, projectId = null) {
    $("#loadingoverlay").fadeIn()
    if (TABLE_TABS[g_accDataTable.tabKey].CATEGORY_NAME == 'hub' && projectId) {
        for (let key in TABLE_TABS) {
            if (TABLE_TABS[key].CATEGORY_NAME == 'hub') {
                $("#" + key).addClass("hidden");
                $("#" + key).removeClass("active");
            }
            else {
                if (TABLE_TABS[key].CATEGORY_DEFAULT)
                    $("#" + key).addClass("active");
                $("#" + key).removeClass("hidden");
            }
        }
    }
    if (TABLE_TABS[g_accDataTable.tabKey].CATEGORY_NAME == 'project' && !projectId) {
        for (let key in TABLE_TABS) {
            if (TABLE_TABS[key].CATEGORY_NAME == 'hub') {
                $("#" + key).removeClass("hidden");
                if (TABLE_TABS[key].CATEGORY_DEFAULT)
                    $("#" + key).addClass("active");
            }
            else {
                $("#" + key).addClass("hidden");
                $("#" + key).removeClass("active");
            }
        }
    }
    const activeTab = $("ul#adminTableTabs li.active")[0].id;
    g_accDataTable.tabKey = activeTab;
    // alert("current active tab is: " + activeTab);
    $("#loadingoverlay").fadeOut()
}

export async function initTableTabs() {
    // add all tabs
    for (let key in TABLE_TABS) {
        $('<li id=' + key + '><a href="accTable" data-toggle="tab">' + TABLE_TABS[key].TAB_NAME + '</a></li>').appendTo('#adminTableTabs');
        $("#" + key).addClass((TABLE_TABS[key].CATEGORY_NAME == 'hub' && TABLE_TABS[key].CATEGORY_DEFAULT) ? "active" : "hidden");
    }
    // event on the tabs
    $('a[data-toggle="tab"]').on('shown.bs.tab', async function (e) {
        $("#loadingoverlay").fadeIn()
        const activeTab = e.target.parentElement.id;
        g_accDataTable.tabKey = activeTab;
        // alert("current active tab is: " + activeTab);
        $("#loadingoverlay").fadeOut()
    });
}

var g_accDataTable = new Table('#accTable');