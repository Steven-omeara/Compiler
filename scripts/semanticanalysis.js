function SA(AST,CST)
{
	function createST()
	{
		var ST = new SymbolTable();
		var scope = -1;
        // Recursive function to handle the expansion of the nodes.
        function expand(node,scope)
        {
	        // If there are no children (i.e., leaf nodes)...
	        if (!node.children || node.children.length === 0)
	        {
	            // ... note the leaf node.
	            if (node.name == "}")
	            {
	          		ST.endChildren();
	          		scope--;
	          	}
	        }
	        else
	        {
	        	if (node.name == "varDecl")
        		{
        			ST.cur.hashTable.addKeyValPair(node.children[1].children[0].name,node.children[0].name,scope);
        		}
        		if (node.name == "Block")
        		{
        			scope++;
        			ST.addNode("Scope " + scope,"branch");
        			console.log("table");
        		}
	            // .. recursively expand them.
	            for (var i = 0; i < node.children.length; i++)
	            {
	                expand(node.children[i],scope);
	            }
	        }
   		}
    // Make the initial call to expand from the root.
    expand(CST.root,scope);

    //return checkVars;
    return ST;
    }

    putSA(createST(AST).toString());
}