function SA(AST,CST)
{
	var SymTab;

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
        			ST.cur.hashTable.addKeyValPair(node.children[1].children[0].name,node.children[0].name,scope,node.lineNum);
        		}
        		/*if (node.name == "Assign")
        		{
        			//console.log(node.children[0].children[0].name);
        			//console.log(node.children[2].children[0].children[0].name);
        			if (node.children[2].children[0].children.length == 1)
        			{
        					var nodeType;
        					if(node.children[2].children[0].children[0].name == "True" || node.children[2].children[0].children[0].name == "False")
        					{
        						nodeType = "Boolean";
        					}
        					ST.cur.hashTable.typeCheck(ST.cur,node.children[0].children[0].name,nodeType);
        			}
        			else
        			{
        				if(node.children[2].children[0].name == "BooleanExpr")
        				{
        					console.log("Current boolop doesnt work");
        				}
        				else
        				{
							//for plus create a method that will compare the first and second thing, then compare next and next until you get them all
        					console.log("Doesn't work yet");
        				}
        			}
        		}*/
        		if (node.name == "Block")
        		{
        			scope++;
        			ST.addNode("Scope " + scope,"branch");
        			//console.log("table");
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

    //SymTab = createST(AST);
    //putSA(SymTab.toString());

    function createSymTable()
    {
    	var scope = -1;
    	var symTable = new SymbolTable();

    	 function expand(node,scope)
        {

        	function block(node,scope)
        	{
        		scope++;
        		symTable.addNode("Scope " + scope,"branch");
        		//console.log("table");
        		for (var i = 0; i < node.children.length; i++)
            	{
                	checkStmtList(node.children[i],scope);
            	}
        	}

        	function checkStmtList(node,scope)
        	{
        		if(node.name == "varDecl")
        		{
        			symTable.cur.hashTable.addKeyValPair(node.children[1].name,node.children[0].name,scope,node.lineNum);
        		}
        		if(node.name == "Block")
        		{
        			block(node,scope);
        			symTable.endChildren();
        			scope--;
        		}
        		if(node.name == "If")
        		{
        			block(node.children[1],scope);
        			symTable.endChildren();
        			scope--;
        		}
        		if(node.name == "While")
        		{
        			block(node.children[1],scope);
        			symTable.endChildren();
        			scope--;
        		}
        		if(node.name == "Assign")
        		{
        			var nodeType;
        			if(node.children[1].name == "+")
        			{
        				console.log("Not doing + yet");
        			}
        			if(node.children[1].name == "!=" || node.children[1].name == "==")
        			{
        				console.log("not looking into boolop yet");
        			}
        			else
        			{
        				if(node.children[1].name == "True" || node.children[1].name == "False")
        				{
        					nodeType = "Boolean";
        					symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        				}
        				if(Number.isInteger(parseInt(node.children[1].name.valueOf())) == true)
        				{
        					//console.log(symTable.cur.name);
        					nodeType = "Int";
        					symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        				}
        				if(node.children[1].name.charAt(0) == '"')
        				{
        					nodeType = "String";
        					symTable.cur.hashTable.typeCheck(symTable.cur,node.children[0].name,nodeType,node.lineNum);
        				}
        				else
        				{

        				}
        				
        			}
        		}
        	}

        	if(node.name == "Block")
        	{
        		block(node,scope);
        	}
        }

       	expand(AST.root,scope);

       	return symTable;
   	}
	putSA(createSymTable());	
}