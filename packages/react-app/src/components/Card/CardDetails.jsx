import React from 'react';
import './CardDetails.css';

const CardDetails = () => {
  return (
    <div className='CardDetails'>
      <div className='CardDetails-row CardDetails-info'>
        <div className='CardDetails-lable'>项目解读：</div>
        <div className='CardDetails-value'>Gitcoin 二次方融资</div>
      </div>
      <div className='CardDetails-row CardDetails-info'>
        <div className='CardDetails-lable'>链接：</div>
        <div className='CardDetails-value'>https://github.com/icepy</div>
      </div>
      <div className='CardDetails-row CardDetails-info'>
        <div className='CardDetails-lable'>作者：</div>
        <div className='CardDetails-value'>icepy</div>
      </div>
      <div className='CardDetails-row CardDetails-info'>
        <div className='CardDetails-lable'>地址：</div>
        <div className='CardDetails-value'>icepy.eth</div>
      </div>
      <div className='CardDetails-row CardDetails-info'>
        <div className='CardDetails-lable'>本期累计收到：</div>
        <div className='CardDetails-value'>20 ETH</div>
      </div>
      <div className='CardDetails-row'>
        <div className='CardDetails-functional'>捐款</div>
        <div className='CardDetails-functional'>提款</div>
        <div className='CardDetails-functional'>历史捐款</div>
      </div>
    </div>
  )
}

export default CardDetails;