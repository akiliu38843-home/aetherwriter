"use client"

import { Component, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-destructive/5 border border-destructive/20 rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-destructive/10 rounded-full">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  出现了一些问题
                </h2>
                <p className="text-sm text-muted-foreground">
                  这个组件遇到了错误
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="mb-4 p-3 bg-background rounded border text-xs font-mono overflow-auto max-h-32">
                <p className="text-destructive font-semibold mb-1">
                  错误信息：
                </p>
                <p className="text-muted-foreground">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={this.handleReset}
                variant="default"
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                重试
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                刷新页面
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              如果问题持续存在，请检查控制台获取更多信息
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

interface AsyncBoundaryProps {
  children: ReactNode
  loading?: ReactNode
}

interface AsyncBoundaryState {
  hasError: boolean
  error?: Error
}

export class AsyncErrorBoundary extends Component<
  AsyncBoundaryProps,
  AsyncBoundaryState
> {
  constructor(props: AsyncBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AsyncBoundaryState {
    return { hasError: true, error }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="font-medium text-destructive">加载失败</span>
          </div>
          
          {this.state.error && (
            <p className="text-sm text-muted-foreground mb-3">
              {this.state.error.message}
            </p>
          )}
          
          <Button
            onClick={this.handleReset}
            size="sm"
            variant="outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重试
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
