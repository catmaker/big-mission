import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">앗! 문제가 발생했습니다.</h2>
            <p className="text-gray-600">
              {this.state.error?.message || "알 수 없는 오류가 발생했습니다."}
            </p>
            <div className="space-x-4">
              <Button onClick={() => window.location.reload()}>새로고침</Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                이전 페이지로
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}