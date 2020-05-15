------------------------------------- 
start
---
- (vscode) launch > sboot
- (vscode) cd uiserver-ng > ng serve --proxy-config proxy.conf.js
- (vscode) launch > chrome

------------------------------------- 
ui 개발
---
cd uiserver-ng

# 생성
```
ng g m yguide/dbtable --routing
ng g c yguide/dbtable
ng g c yguide/dbtable/view-aleft1 --inlineStyle=true --inlineTemplate=true --flat=true
ng g c yguide/dbtable/view-aright1 --inlineStyle=true --inlineTemplate=true --flat=true
ng g c yguide/dbtable/view-aright2 --inlineStyle=true --inlineTemplate=true --flat=true
ng g c yguide/dbtable/view-aright3 --inlineStyle=true --inlineTemplate=true --flat=true

module 		    > import SharedModule
routing 	    > { path: 'dbtable',component: DbtableComponent },
app-routing	    > { path: 'yguide', loadChildren: () => import('./yguide/dbtable/dbtable.module').then(m => m.DbtableModule) },
app.html	   > 메뉴추가
```
# layout
# view/left > form
# view/right1 > table
# view/right2 > editor










