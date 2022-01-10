({
	doinit : function(component, event, helper) {
        console.log('Inside Init');
        
        var myPageRef = component.get("v.pageReference");
        var accIds = myPageRef.state.c__allAccsIds;
        console.log('accIds : '+accIds);
        component.set("v.accountsIds", accIds);
		
	},
})