import * as React from "react";

export interface ITrayWindowComponentProps {

}

export interface ITrayWindowComponentState {
}

export default class TrayWindowComponent
    extends React.Component<ITrayWindowComponentProps, ITrayWindowComponentState> {

    public constructor(props: any) {
        super(props);

        this.state = {
        };
    }


    public render() {
        return <div>trau page</div>
    }


}
