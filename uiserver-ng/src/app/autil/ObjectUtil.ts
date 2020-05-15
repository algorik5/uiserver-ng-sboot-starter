
export class ObjectUtil
{
    static flat_arrayToObject(arr)//[{a:aa},{b:bb},{c.cl:c11},{c.c12:c22}] >>> {a:aa,b:bb,c.cl:c11,c.c12:c22}
    {
        // let obj = arr.reduce((obj, item) => { return { ...obj, [item[key]]: item, }; });
        let obj = {};
        arr.forEach(data=>{ for (var key in data) { obj[key]=data[key]} });
        return obj;
    }
  
    static flat_objectToArray(obj)//{a:aa,b:bb,c:{c1:c11,c2:c22}} >>> [{a:aa},{b:bb},{c.cl:c11,c.c12:c22}]
    {
      let arr = [];
      this.flat_objectToArray_real(arr,"",obj);
      return arr;
    }
    private static flat_objectToArray_real(arr,parentkey,obj)
    {
      // for(var key in obj) { arr.push({[key]:obj[key]}); }
      for(var key in obj) 
      { 
        let value = obj[key];
        if(Array.isArray(value)) continue;//array는 일단 무시
        let keynnew = parentkey.length>0? parentkey+"."+key:key;
        if(typeof(value)=="object") this.flat_objectToArray_real(arr,keynnew,value);
        else arr.push({[keynnew]:value}); 
      }
      // console.log("=== data#"+ JSON.stringify(arr));
    }
  
  




    static values(obj)
    {
        //Object.values(obj);//불가 - 지원되지 않는 브라우저가 경우 있음
        //values.forEach((v,i)=>console.log("-i:v="+i+">>>"+v));
        return Object.keys(obj).map(k=>obj[k]);
    }
    static keyvalues(obj)
    {
        //keyvalues.forEach((v,i)=>console.log("-i:v="+i+">"+v["key"]+"---"+v["value"]));
        return Object.keys(obj).map(key=>{ return {key:key,value:obj[key]}; });
    }
    static testCreate():void
    {
    }
    static isArray(obj)
    { 
        return Array.isArray(obj);
    }
    static testAddFieldFirst()
    {
        let user = { name: 'Dzon', age: 25, address: 'Sunny street 34' };
        user = Object.assign({first: "first"}, user);//first
        user = Object.assign(user,{last: "last"});//last >>> user["last"] = "last"
    }
    static getFields(obj):any[]//항상 array리턴
    {
        if(typeof(obj) != 'object') return [obj];
        if(Array.isArray(obj)) return ["-array-"];//+obj.length;//string,int array
        return Object.keys(obj);
    }

    static cloneObject(obj:any)//:any --- any를 return하니 안되네... 흠
    {
        //return {...obj};//deep copy - array안됨 ?
        return JSON.parse(JSON.stringify(obj));//deep copy
        
        //return Object.assign({}, obj);//deep copy 아님 - 되는거 같은데 ...
        //return Object.create(obj);//deep copy 아님
        /////////// object deep copy
        // let user = { name: 'Dzon', age: 25, address: 'Sunny street 34' };
        // let updatedUser = { ...user ,name: 'Peter' }
        /////////// array deep copy
        //let results = [10, 12, 14];
        //let newNumbers = [...results];//, 45, 56];
    }
    static mergeObject()
    {
        var o1 = { a: 1 };
        var o2 = { b: 2 };
        var o3 = { c: 3 };
        var obj = Object.assign(o1, o2, o3);
        console.log(obj); // { a: 1, b: 2, c: 3 }
        console.log(o1);  // { a: 1, b: 2, c: 3 }, target object itself is changed.
    }

    static typestring(obj:any)
    {
        return typeof obj;//typeof(event)
    }
    static typeconvert(obj:any)
    {
        if(1==1) return obj as string;
        if(1==1) return <string>obj;
    }
    static hasField(obj:any,field:string)
    {
        return obj.hasOwnProperty(field);
    }
    static objectToString(o) 
    { 
        if(typeof(o) == 'object') return JSON.stringify(o); 
        return o; 
    }
    static objectToStringEx(o) 
    { 
        return ObjectUtil.stringifyEx(o); 
    }
    static objectToStringEx2(data,column:string) {
        // if(column.includes("."))
        // {
        //   let split = column.split(".");
        //   return ObjectUtil.objectToStringEx(data[split[0]][split[1]]);
        // }
        // if(typeof(data[column]) == 'object') return "[object]";//아래 테이블에 값 표현
        // return ObjectUtil.objectToStringEx(data[column]);
        if(typeof(data) != 'object') return data;
        if (data.hasOwnProperty(column)==false) return;
        if(Array.isArray(data[column])) return "array["+data[column].length +"]";
        return data[column];
     }


    //(typescript) JSON format per se doesn't support object references - TypeError: Converting circular structure to JSON
    static stringifyEx (object:any){
        var simpleObject = {};
        for (var prop in object ){
            //alert("--" + prop +" >>> "+ (typeof(object[prop])));
            if (object.hasOwnProperty(prop)==false){ continue; }
            if (Array.isArray(object[prop]) == true){
                //simpleObject[typeof(object[prop])] = "object---xxx";
                simpleObject[typeof(object[prop])] = "array---"+ prop +"-"+ object[prop].length;
                continue;
            }
            if (typeof(object[prop]) == 'object'){
                //simpleObject[typeof(object[prop])] = "object---xxx";
                simpleObject[typeof(object[prop])] = "object---"+ prop;
                continue;
            }
            if (typeof(object[prop]) == 'function'){
                //simpleObject[typeof(object[prop])] = "function---xxx";
                simpleObject[typeof(object[prop])] = "function---"+ prop;
                continue;
            }
            simpleObject[prop] = object[prop];
        }
        return JSON.stringify(simpleObject); // returns cleaned up JSON
    }
    static testKeys()
    {
        let obj: any = {name:"table-1",age:1,year:2001,contents:"xxx-1",expand:false};
        console.log('--- keys      # '+ "#obj="+Object.keys(obj));//#length=2#id=1#name=aaa

        // for (const key in obj) {
        //     if (obj.hasOwnProperty(key)) {
        //         console.log(key);
        //     }
        // }
        //https://blog.wizardsoftheweb.pro/typescript-decorators-reflection/
        // for (const key of Reflect.ownKeys(obj)) {
        //     console.log(key);
        // }
        //console.log(Reflect.has(obj, "name"));
        //Reflect.deleteProperty(obj, "name")
        //Reflect.defineMetadata("foo1", "bar1", this, "baz");
        //Reflect.getMetadata("foo1", basicUsageDemo, "baz")
    }
    static testAdd()
    {
        let obj: any = {name:"table-1",age:1,year:2001,contents:"xxx-1",expand:false};
        obj["aaa"] = "AAAAA";
        obj.bbb = "BBBB";
        console.log('--- obj       # '+ "#obj="+JSON.stringify(obj));//#length=2#id=1#name=aaa
    }


}