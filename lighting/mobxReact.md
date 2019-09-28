# Mobx 与 React 的最佳实践

## Container + Components  Vs  Observable + Observer
传统的React或者React + Redux技术栈的数据流的中，组件被分为下面两类



 |               | 展示组件              | 容器组件                                                |
 | ------------- | --------------------- | ------------------------------------------------------- |
 | 作用          | 描述如何展现          | 描述如何运行（数据获取、状态更新）                      |
 | 直接使用Redux | 否                    | 是                                                      |
 | 数据来源      | props                 | Redux state，或者组件state                              |
 | 数据修改      | 从 props 调用回调函数 | 向 Redux 派发 actions，或者在容器组件内部调用`setState` |
 |               |                       |                                                         |  |  |

这种设计严格遵守单向数据流，组件的状态和回调通过Props不断往下传递和消费。
这种设计，在业务逻辑复杂的情况下，会存在三个问题。
1. 展示组件会嵌套展示组件，那么外层的展示组件需要继续将事件的回调和state往下传递
2. 给展示组件的props可能会有很多项，JSX中props的列表会变得比较长
3. 如果使用容器组件的state作为状态，大量的handle函数也会被写在容器组件中，也会导致组件的代码过长。
例子在[这里](http://gitlab2.dui88.com/tuia-frontend/tuia-bigData-frontend/reports-node/blob/0ddde4bde200071ccb1f296bdbcc9191530af711/new-reports-node/src/pages/tuia/containers/monitor/media-realtime/index.jsx#L376)

这份代码是[Iron](mailto:lujianwei@duiba.com.cn)写的。严格遵循单项数据流，除了Ajax的数据外，剩下的都在`container`的`state`中存储和处理。这份代码注释写得完备，但因业务复杂，很多回调和state需要components往它的子components传递。

**我们发现，我们数据和回调的传递流与视图相同，因为视图的嵌套层级过深，那么数据和回调传递的流，也需要一级一级往下传递。可是，为什么数据流要和视图的层次结构相同呢？有了mobx，数据流和视图的层次结构就可以不同**

## Observable + Observer，React + Mobx的最佳实践
此最佳实践调研了Medium、StackOverflow、掘金上的大量文章。对于复杂的业务，能用更少的代码去维护复杂状态。

Mobx 的官方文档中将 store 分为两种，*用户界面状态的 store*和*领域Store*。

一个应用有一个 *用户界面状态store*和多个 *领域Store*组成。

*用户界面状态的 store*代表了一些全局共享的变量。他的责任是全局会广泛用到的状态的共享。

通常可以在 UI stores 中找到的:

- Session 信息
- 应用已经加载了的相关信息
- 不会存储到后端的信息
- 全局性影响 UI 的信息
- 窗口尺寸
- 可访问性信息
- 当前语言
- 当前活动主题
- 用户界面状态瞬时影响多个、毫不相关的组件:
- 当前选择
- 工具栏可见性, 等等
- 向导的状态
- 全局叠加的状态

另一Store，也是我们存储和处理相关业务数据的Store，被称为 **领域Store**。
领域Store的职责是

- 实例化领域对象， 确保领域对象知道它们所属的 store。
- 确保每个领域对象只有一个实例。 同一个用户、订单或者待办事项不应该在内存中存储两次。 这样，可以安全地使用引用，并确保正在查看的实例是最新的，而无需解析引用。 当调试时这十分快速、简单、方便。
- 提供后端集成，当需要时存储数据。

**综上所述，我们过去认知中，Mobx 的 Store 中的数据纯粹是为了数据共享的认知，是片面错误的。**

**仅是全局Store用于存储共享的状态。领域 Store 和 container 中的state，在功能上是一样的。**

### 一个领域 Store 应该代表它对应的业务 UI 状态
想象一下，将store中的数据序列化之后存入文件，再打开应用，读取文件中的store，那么应该与应用关闭前一样。
在React函数式编程的思想中，store中的数据作为输入，我们的业务逻辑是一个纯函数，最后展现在网页上的视图是输出。
领域Store中应该存储下面数据

- Ajax请求获取到的数据
- 页面上各类组件的回调函数
- 页面交互的状态（比如Loading，Modal可见性，某个按钮的disabled，输入类组件中的值等等）
- 其它业务逻辑
- 一些从原始的observable数据中衍生出的数据

### 谁应该成为 Observer
从上面这个`section`中，明显地，组件所有与业务有关的状态都被统一存放在对应的领域store中。
下一步，我们那个业务Store，成为该领域下所有组件的 **唯一** 数据源。

那么，所有消费store中数据的组件，都应该是无状态组件，他们的状态被统一在领域store中管理。这些无状态组件的职责只有2点
1. 接收store中的状态并通过合适的UI展示它们。
2. 在合适的时候调用store中的@action方法作为回调。

**综上所述，所有store数据的消费者，都应该成为Observer**

那么这样的情况下的数据流，只有扁平的2-3层。

第一层为领域Store，统一掌管业务中的一切状态和对应时机的状态处理逻辑。其中的状态们是observable的。
第二层为组件，各种拆分得足够细小的组件，他们消费领域store中的数据，每个都是store的observer。
第三层为纯粹的UI组件，比如Ant design等各种组件库的组件，项目内组件库的组件，当前业务可复用的组件逻辑。

**无论视图的嵌套层次有多深，数据流的结构永远是扁平的2~3层**

### 我们再来看看React + Redux的设计中的三个问题
#### 展示组件会嵌套展示组件，那么外层的展示组件需要继续将事件的回调和state往下传递
显然，数据流只有2~3层，传参问题缓解了很多。

#### 给展示组件的props可能会有很多项，JSX中props的列表会变得比较长
第二层的observer组件, 不需要父组件给子组件传props，因为子组件的props是通过`mobx-react`的`inject`方法自动注入到Observer中。过去这层通过props传值导致了大量的props。

#### 如果使用容器组件的state作为状态，大量的handle函数也会被写在容器组件中，也会导致组件的代码过长。
这个问题无法完全解决，因为业务代码带来的代码量是无法避免的。但有所缓解，因为所有的逻辑都在store中，比起container中既有部分视图又有大量逻辑的情况，做了代码拆分。

### Observable + Observer 设计的优点
#### 便于调试
当我们某个组件出现问题时，我们只需要在store中追踪对应的逻辑即可。而不需要沿着视图的嵌套结构一层一层往上找。

#### 性能更优
因为`mobx-react`的机制，Observer只会在它依赖的数据更新时进行它的调和算法计算虚拟 DOM 变化，其它情况下不会重新计算。而仅靠React，没有PureComponent，在state改变时，所有组件都会进行调和，据Mobx官方文档所言，React在渲染大型数据集时的调和非常糟糕。
observer高阶函数重新实现了`shouldComponentUpdate`生命周期，避免了组件很多不必要的渲染

另外，在React16中无状态组件比有状态的类组件运行速度更快。因此如非有必要（比如必须引用ref），强烈建议用函数式组件编写`observer`的业务代码。

完整的例子可以见元数据管理系统的数据补录模块

http://gitlab2.dui88.com/bigdata/metadatatool/blob/51581d71f01d3a7f1acad386e9190c2d5d768a99/frontend-new/src/containers/data-tool/DataCollection/index.jsx