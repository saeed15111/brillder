import React from 'react'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';


export interface ChooseSeveralProps {
}

const ChooseSeveralComponent: React.FC<ChooseSeveralProps> = () => {
  return (
    <div className="input-box ">
      <DragIndicatorIcon />
      <div>
        ChooseSeveralComponent
      </div>
    </div>
  )
}

export default ChooseSeveralComponent