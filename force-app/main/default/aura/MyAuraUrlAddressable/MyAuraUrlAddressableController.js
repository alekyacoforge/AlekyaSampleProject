({
    doInit: function(component) {
        const pageReference = component.get("v.pageReference");
        component.set("v.myParam", pageReference.state.myParam);
    }
})