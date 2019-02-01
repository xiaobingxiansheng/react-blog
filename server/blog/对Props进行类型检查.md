---
title: 对Props进行类型检查
date: 2017-01-11 1:33:26
tags:
    - javascript
---

## 为什么需要类型检查？

JavaScript是一门弱类型的语言，允许变量类型做隐式转换。也正是因为这个特性，JavaScript中有很多错误都是类型错误导致的。    
我们来看一份rollbar公司对 1000+ 项目的错误回收分析 top10

[文章链接](https://rollbar.com/static/javascript-error-graph-aced7330c2844069d95dfb92a87a3c82-da028.png)

![图片](https://rollbar.com/static/javascript-error-graph-aced7330c2844069d95dfb92a87a3c82-da028.png)

这种问题在JavaScript中很普遍，为了减少这种错误，我们可以在react中引入类型检查模块：prop-types

## react中的类型检查：prop-types包

### 简单例子

- 导入包

    ```
    import PropTypes from 'prop-types';
    ```

- 编写组件

    ```
    class Greeting extends React.Component {
        render() {
            return <h1>Hello, {this.props.name}</h1>
        }
    }
    ```

- 新增类型检查

    ```
    Greeting.propTypes = {
        name: PropTypes.string
    }
    ```

- 检验类型检查
  
    上面我们给Greeting组件的属性name设置成String类型，也就是说父组件通过该属性传递数据的时候，需要传递String类型的数据，否则会显示类型错误的警告。
    
    ```
    <div>
        <Greeting name={123} />
    </div>
     ```

- 页面报错告警

    ![图片](./imgs/error-props.png)

  
  
PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的。在这个示例中，我们使用了 PropTypes.string。当你给属性传递了无效值时，JavsScript 控制台将会打印警告。出于性能原因，propTypes 只在开发模式下进行检查。


## prop-types的多种验证器

```
MyComponent.propTypes = {
    // 你可以将属性声明为以下 JS 原生类型
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,

    /* 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。*/
    optionalNode: PropTypes.node,

    // 一个 React 元素。
    optionalElement: PropTypes.element,

    // 你也可以声明一个 prop 是类的一个实例。
    // 使用 JS 的 instanceof 运算符。
    optionalMessage: PropTypes.instanceOf(Message),

    // 你可以声明 prop 是特定的值，类似于枚举
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),

    // 一个对象可以是多种类型其中之一
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Message)
    ]),

    // 一个某种类型的数组
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

    // 属性值为某种类型的对象
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // 一个特定形式的对象
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),

    // 你可以使用 `isRequired' 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告。
    requiredFunc: PropTypes.func.isRequired,

    // 任何数据类型的值
    requiredAny: PropTypes.any.isRequired,

    /* 你也可以声明自定义的验证器。如果验证失败返回 Error 对象。不要使用 `console.warn` 或者 throw ，*/
    // 因为这不会在 `oneOfType` 类型的验证器中起作用。
    customProp: function (props, propName, componentName) {
        if (!/matchme/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },

    // 也可以声明`arrayOf`和`objectOf`类型的验证器，如果验证失败需要返回Error对象。
    // 会在数组或者对象的每一个元素上调用验证器。验证器的前两个参数分别是数组或者对象本身，
    // 以及当前元素的键值。
    customArrayProp: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
        if (!/matchme/.test(propValue[key])) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    })
};
```

在类型后添加 ***.isRequired*** 会将属性设置成必传属性，如果属性没传或是 undefined，则会显示报错信息。

## 属性默认值

你可以通过配置 defaultProps 为 props定义默认值：

```
// 为属性指定默认值:
Greeting.defaultProps = {
    name: 'Stranger'
};
```

defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在 defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面。


## 使用PropTypes.element限制单个子代

使用 PropTypes.element 你可以指定只传递一个子代

```
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // This must be exactly one element or it will warn.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

this.props.children是父组件在MyComponent中添加的字节点，当children的最外层元素存在兄弟节点，而不是只有一个父节点时，会弹出报错告警。

这会报警：

```
<div>
    <MyComponent>
        <div>hello</div>
        <div>props</div>
    </MyComponent>           
</div> 
```

正确：

```
<div>
    <MyComponent>
        <div>hello props</div>
    </MyComponent>           
</div> 
```
