({
    init: function (component, event, helper) {
      var pageReference = component.get("v.pageReference");
      var rId = pageReference.state.c__crecordId;
      component.set("v.crecordId", rId);
      var toastEvent = $A.get("e.force:showToast");
      toastEvent.setParams({
        mode: "sticky",
        message: "This is a subtab"
      });
      toastEvent.fire();
    }
  });