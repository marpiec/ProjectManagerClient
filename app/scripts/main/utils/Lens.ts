module Lens {

    export class PathAccumulator {
        ___rootElement: any;
        ___path: string[];
        [name: string]: any;
        constructor(rootElement: any, path: string[]) {
            this.___rootElement = rootElement;
            this.___path = path;
        }
    }

    export function of<T>(something: T, path: string[] = []):T {

        var pathAccumulator = new PathAccumulator(path, <any>something);


        if(typeof something === "number" ||
            typeof something === "boolean" ||
            typeof something === "string") {
            return <any>pathAccumulator;
        } else {
            const anySomething: any = something;

            if(something instanceof Immutable.Map || something instanceof Immutable.Record) {
                const keys = (<Immutable.Map<any, any>>anySomething).keySeq().toArray();
                keys.forEach(key => {
                    if (typeof anySomething[key] == "function") {
                        pathAccumulator[key] = Lens.of(anySomething[key], path.concat([key]));
                    } else {
                        pathAccumulator[key] = Lens.of(anySomething[key], path.concat([key]));
                    }
                });
            } else {
                for (let propertyName in anySomething) {
                    if (typeof anySomething[propertyName] == "function") {
                        pathAccumulator[propertyName] = Lens.of(anySomething[propertyName], path.concat([propertyName]));
                    } else {
                        pathAccumulator[propertyName] = Lens.of(anySomething[propertyName], path.concat([propertyName]));
                    }
                }
            }



            return <any>pathAccumulator;
        }

    }

    export function path(somethingPath: any): any[] {
        return (<PathAccumulator>somethingPath).___path;
    }

    export function setIn<T>(container: T, value: T): any {

        if(container instanceof PathAccumulator) {

            const pathAccumulator = <PathAccumulator><any>container;


            if(pathAccumulator.___rootElement instanceof Immutable.Map) {
                return (<Immutable.Map<any, any>>pathAccumulator.___rootElement).setIn(pathAccumulator.___path, value);
            } else {
                throw new Error("Only Immutable.Map is supported");
            }

        } else {
            throw new Error("Container must be PathAccumulator");
        }

    }


}


