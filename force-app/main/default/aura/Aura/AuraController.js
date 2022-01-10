({
    openTabWithSubtab : function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openTab({
            url: '/lightning/r/Account/0035g00000GdarZAAR/view',
            focus: true
        }).then(function(response) {
            workspaceAPI.openSubtab({
                parentTabId: response,
                url: '/lightning/r/Contact/0035g00000GdarZAAR/view',
                focus: true
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
})