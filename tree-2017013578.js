class Tree {
    constructor(treeObj) {
        
        //获取元素
        this.container = document.querySelector(treeObj.container);
        this.root = treeObj.tree;
        this.items = new Array();
        this.callback = treeObj.clicked;

        // 生成DOM
        if (this.root) {
            let ele = document.createElement('ul');
            ele.className = 'tree-list';
            this.generate(this.root, ele)
            this.container.appendChild(ele);
        }

        // 为每个节点(标题)添加点击事件
        this.items = this.container.querySelectorAll('.tree-title, .tree-title-selected');
        for (let item of this.items) {
            item.addEventListener("click", evt => {
                if (item.className == 'tree-title') {
                    for (let ele of this.items) {
                        ele.className = 'tree-title';
                    }
                    item.className = 'tree-title-selected';
                }
            })
            item.addEventListener('click', evt => {
                let id = item.parentElement.firstChild.firstChild.id;
                this.callback(id)
            });
        }

        // 为每个非叶节点(图标)添加展开与折叠事件
        const controls = this.container.querySelectorAll('.tree-checkbox');
        if (controls) {
            for (let control of controls) {
                control.addEventListener('click', evt => {
                    this.toggle(control.id);
                });
            }
        }
    }

    // 生成DOM
    generate(mroot, par) {
        if (!mroot) {
            return;
        }
        let ele = document.createElement('li');

        if (mroot.children.length == 0) {
            ele.innerHTML = `<span><input id='${ mroot.id }' type='checkbox' class="tree-leaf-checkbox"><label for='${ mroot.id }'></label></span><span class="tree-title">${ mroot.title }</span>`;
        } else {
            ele.innerHTML = `<span><input id='${ mroot.id }' type='checkbox' class="tree-checkbox"><label for='${ mroot.id }'></label></span><span class="tree-title">${ mroot.title }</span>`;
        }

        if (mroot.expand) {
            ele.firstChild.firstChild.checked = true;
        }

        // 区分叶节点和非叶节点样式
        for (let child of mroot.children) {
            let nextpar = document.createElement('ul');
            if (mroot.expand) {
                nextpar.className = 'tree-list';
            } else {
                nextpar.className = 'tree-list-none';
            }

            this.generate(child, nextpar)
            ele.appendChild(nextpar)
        }
        par.appendChild(ele);
    }

    // 处理展开和收起
    toggle(id) {
        var ele = document.getElementById(id);
        var children = ele.parentElement.parentElement.children;

        // 每个ul的前两个元素是该节点的图标和标题span,后面的节点才是其孩子
        for (let i = 2; i < children.length; i++) {
            if (children[i].className != 'tree-list-none') {
                children[i].className += " list-close";
                setTimeout(() => {
                    children[i].className = 'tree-list-none'
                }, 300);
            } else {
                children[i].className += ' list-open';
                setTimeout(() => {
                    children[i].className = "tree-list";
                }, 300);
            }
        }
    }

}