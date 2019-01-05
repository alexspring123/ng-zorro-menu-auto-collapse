# NgZorroMenuAutoCollapse
主要用来实现类似阿里云控制台鼠标摸上去自动显示菜单功能。

![Demo](https://github.com/alexspring123/ng-zorro-menu-auto-collapse/tree/master/image/Demo.gif)

## 主要设计方案
1. 记录鼠标是否在主菜单上（mouseOnMenu），通过鼠标mouseover和mouseout事件实现
2. 记录二级菜单的打开状态（subMenuState），并通过subMenu的nzOpen属性进行双向绑定
3. 当发生如下场景时触发主菜单的刷新
- 鼠标进入主菜单：展开主菜单
- 鼠标离开主菜单：如果所有子菜单都关闭，则收缩主菜单，否则展开主菜单
- 子菜单关闭时：如果鼠标在主菜单上，则展开主菜单；如果鼠标不在主菜单上，并且所有子菜单都关闭，则收缩主菜单
- 子菜单打开：此场景不需要处理，因为只有鼠标在主菜单上时才会触发，与场景1相同

## 注意点
1. 必须用鼠标的mouseover和mouseout事件来判断是否进入主菜单（注意不能使用mouseenter和mouseleave，因为不能冒泡）
2. 由于主菜单和子菜单中间存在间隙，因此使用了Rxjs的Observer进行了防抖
3. 修改了ant-menu的动画时间（从0.2s改成了0.1s）,否则会出现二级菜单先出来，而主菜单还没有完全展开的情况
4. 由于subMenu使用了cdk组件，因此submenu弹出菜单并不包含在menu的Html元素中，因此监听不到mouseover。尝试过在subMenu中的每个item上增加鼠标事件，但是碰到了一个问题，menuItem存在margin值，当鼠标移动到margin上时，会触发mouseout事件。