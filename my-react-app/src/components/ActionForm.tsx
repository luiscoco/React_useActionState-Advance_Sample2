import type { ActionState } from '../actions';
import { Loader2, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ActionFormProps {
    formAction: (payload: FormData) => void;
    isPending: boolean;
    state: ActionState;
}

export function ActionForm({ formAction, isPending, state }: ActionFormProps) {
    return (
        <div className="form-wrapper">
            <div className="form-card">
                <h2 className="card-title">Data Processor</h2>
                <p className="card-desc">
                    Enter data to process. The 3D engine will visualize the server action state managed by
                    <code className="code-snippet">useActionState</code>.
                </p>

                <form action={formAction}>
                    <div className="form-group">
                        <label htmlFor="inputData" className="form-label">
                            Input Payload
                        </label>
                        <input
                            type="text"
                            id="inputData"
                            name="inputData"
                            placeholder="Type something..."
                            className="form-input"
                            disabled={isPending}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="submit-btn"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="status-icon spin" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <Send className="status-icon" />
                                <span>Submit Transaction</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Result Message */}
                {state.status !== 'idle' && !isPending && (
                    <div className={`status-box ${state.status}`}>
                        {state.status === 'success' ? (
                            <CheckCircle className="status-icon" />
                        ) : (
                            <AlertCircle className="status-icon" />
                        )}
                        <div>
                            <p className="status-title">{state.status === 'success' ? 'Success' : 'Error'}</p>
                            <p className="status-text">{state.message}</p>
                            <p className="status-time">Timestamp: {state.timestamp}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
