({
 onInit: function (component, event, helper) {

 },
 handleOpenSubTab: function (component, event, helper) {
   const workspaceAPI = component.find('workspaceAPI');
   const recordId = event.getParam('recordId');

   if (!recordId) {
     return;
   }

   workspaceAPI.isConsoleNavigation().then(isConsole => {
     if (isConsole) {
       workspaceAPI.getFocusedTabInfo()
         .then(
           result => {
             workspaceAPI.openSubtab({
               parentTabId: result.tabId,
               recordId,
               focus: true
             }).then(
               tabId => {
                 console.log("Solution #1 - SubTab ID: ", tabId);
               }
             );
           }
         );
     }
   });
 }
});