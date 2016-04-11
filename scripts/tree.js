//-----------------------------------------
// treeDemo.js
//
// By Alan G. Labouseur, based on the 2009
// work by Michael Ardizzone and Tim Smith.
//-----------------------------------------

function Tree() {
    // ----------
    // Attributes
    // ----------
    
    this.root = null;  // Note the NULL root node of this tree.
    this.cur = {};     // Note the EMPTY current node of the tree we're building.


    // -- ------- --
    // -- Methods --
    // -- ------- --

    // Add a node: kind in {branch, leaf}.
    this.addNode = function(name, kind) {
        // Construct the node object.
        var node = { name: name,
                     children: [],
                     parent: {}
                   };

        // Check to see if it needs to be the root node.
        if ( (this.root == null) || (!this.root) )
        {
            // We are the root node.
            this.root = node;
        }
        else
        {
            // We are the children.
            // Make our parent the CURrent node...
            node.parent = this.cur;
            // ... and add ourselves (via the unfrotunately-named
            // "push" function) to the children array of the current node.
            this.cur.children.push(node);
        }
        // If we are an interior/branch node, then...
        if (kind == "branch")
        {
            // ... update the CURrent node pointer to ourselves.
            this.cur = node;
        }
    };

    // Note that we're done with this branch of the tree...
    this.endChildren = function() {
        // ... by moving "up" to our parent node (if possible).
        if ((this.cur.parent !== null) && (this.cur.parent.name !== undefined))
        {
            this.cur = this.cur.parent;
        }
        else
        {
            // TODO: Some sort of error logging.
            // This really should not happen, but it will, of course.
        }
    };

    // Return a string representation of the tree.
    this.toString = function() {
        // Initialize the result string.
        var traversalResult = "";

        // Recursive function to handle the expansion of the nodes.
        function expand(node, depth)
        {
            // Space out based on the current depth so
            // this looks at least a little tree-like.
            for (var i = 0; i < depth; i++)
            {
                traversalResult += "-";
            }

            // If there are no children (i.e., leaf nodes)...
            if (!node.children || node.children.length === 0)
            {
                // ... note the leaf node.
                traversalResult += "[" + node.name + "]";
                traversalResult += "\n";
            }
            else
            {
                // There are children, so note these interior/branch nodes and ...
                traversalResult += "<" + node.name + "> \n";
                // .. recursively expand them.
                for (var i = 0; i < node.children.length; i++)
                {
                    expand(node.children[i], depth + 1);
                }
            }
        }
        // Make the initial call to expand from the root.
        expand(this.root, 0);
        // Return the result.
        return traversalResult;
    };

    this.DFS = function()
    {
        // AST Tree

        var AST = new Tree();
        var ifwhileCheck = false;

        // Recursive function to handle the expansion of the nodes.
        function expand(node, depth)
        {
            
            function checkStatementList(node)
            {
                if(node.name == "PrintStmt")
                {
                    AST.addNode("Print","branch");
                    checkExpr(node.children[2]);
                    AST.endChildren();
                }
                else if(node.name == "varDecl")
                {
                    AST.addNode("varDecl","branch");
                    AST.addNode(node.children[0].name,"leaf");
                    AST.addNode(node.children[1].children[0].name,"leaf");
                    AST.endChildren();
                }
                else if(node.name == "Assign")
                {
                    //Could also be =, instead of assign
                    AST.addNode("Assign","branch");
                    AST.addNode(node.children[0].children[0].name,"leaf");
                    checkExpr(node.children[2]);
                    AST.endChildren();
                }
                else if(node.name == "If")
                {
                    AST.addNode("If","branch");
                    ifwhileBooleanCheck(node.children[1]);
                    ifwhileCheck = true;
                    //addBlock();
                    //checkStatementList(node.children[2].children[1].children[0]);
                    //AST.endChildren();
                    console.log(node.children[2].children[1].children[0].name);
                }
                else if(node.name == "While")
                {
                    AST.addNode("While","branch");
                    ifwhileBooleanCheck(node.children[1]);
                    //addBlock();
                    //checkStatementList(node.children[2].children[1].children[0]);
                    //AST.endChildren();
                    console.log(node.children[2].children[1].children[0].name);
                }
                // && notFirst == false
                else if (node.name == "Block")
                {
                    addBlock();
                    //notFirst = true;
                }
            }

            function addBlock()
            {
                AST.addNode("Block","branch");
            }

            function checkExpr(node)
            {
                //console.log(node.children[0].name);
                if(node.children[0].name == "Id")
                {
                    AST.addNode(node.children[0].children[0].name,"leaf");
                }
                else if(node.children[0].name == "BooleanExpr")
                {
                    booleanCheck(node.children[0]);
                }
                else if (node.children[0].name == "IntExpr")
                {
                    intExprCheck(node.children[0]);
                }
                //Change StringExpr to return string not null in lex
                else if (node.children[0].name == "StringExpr")
                {
                    AST.addNode(node.children[0].children[0].name,"leaf");
                }   
            }
            function booleanCheck(node)
            {
                if(node.children[0].name == "True" || node.children[0].name == "False")
                {
                    AST.addNode(node.children[0].name,"leaf");
                }
                else
                {
                    //This is currently set to "!="/"==", can change it to compare or whatever if needed
                    AST.addNode(node.children[2].name,"branch");
                    checkExpr(node.children[1]);
                    checkExpr(node.children[3]);
                    AST.endChildren();
                }
            }
            function ifwhileBooleanCheck(node)
            {
                if(node.children[0].name == "True" || node.children[0].name == "False")
                {
                    AST.addNode("Cond","branch");
                    AST.addNode(node.children[0].name,"leaf");
                    AST.endChildren();
                }
                else
                {
                    //This is currently set to "!="/"==", can change it to compare or whatever if needed
                    AST.addNode("Cond","branch");
                    checkExpr(node.children[1]);
                    checkExpr(node.children[3]);
                    AST.endChildren();
                }
            }
            function intExprCheck(node)
            {
                if (node.children.length > 1)
                {
                    //Currently putting in +, can put in Add if need be
                    AST.addNode(node.children[1].name,"branch");
                    AST.addNode(node.children[0].name,"leaf");
                    checkExpr(node.children[2]);
                    AST.endChildren();
                }
                else
                {
                    AST.addNode(node.children[0].name,"leaf");
                }
            }

            // If there are no children (i.e., leaf nodes)...
            if (!node.children || node.children.length === 0)
            {
                if(node.name == "}")
                {
                    AST.endChildren();
                    if (ifwhileCheck == true)
                    {
                        AST.endChildren();
                        ifwhileCheck == false;
                    }
                }
            }
            else
            {
                /*if(node.name == "Block")
                {
                    AST.addNode("Block","branch");
                }*/
                checkStatementList(node);
                // There are children, so note these interior/branch nodes and ...
                // .. recursively expand them.
                for (var i = 0; i < node.children.length; i++)
                {
                    expand(node.children[i], depth + 1);
                }
            }
        }
        // Make the initial call to expand from the root.
        expand(this.root, 0);
        // Return the result.
        return AST;
    }
}