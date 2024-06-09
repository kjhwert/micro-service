import React, {Component, ErrorInfo, ReactNode} from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}
export default class RemoteErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.

    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    (error as any).data && alert((error as any).data.message);

    return this.setState({ hasError: true });
  }

  // 에러 세부 분기는 일단 나중에
  render() {
    if (this.state.hasError) {
      return <p>remote module을 가져오는데 실패했습니다.</p>;
    }

    return this.props.children;
  }
}
