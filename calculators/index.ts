/**
 * FincTools v2 — Calculator Registry
 * Maps tool slug → React component untuk dynamic routing
 */

import type { ComponentType } from 'react'

// Trading
import {
  RiskManager, TradeAnalyzer, StopLossOptimizer, MaxLossGuardian,
  TradingPerformanceAnalyzer, WinRateExpectancyTracker, DrawdownRecoveryPlanner,
  PipProfitAnalyzer, MarginLeverageGuard, SwapCostEstimator,
  KellyCriterionOptimizer, ProbabilityOfRuinAnalyzer, StreakAnalyzer,
} from './trading'

// Pajak
import {
  TaxOptimizerPPh21, THRTaxPlanner, FreelancerTaxEstimator,
  InvestmentTaxReportGenerator, ZakatTaxPlanner, UMKMTaxEstimator, PPNTracker,
} from './pajak'

// Investasi
import {
  DCASimulator, SBNMaturityPlanner, CouponIncomePlanner, BondYieldAnalyzer,
  GoldDCASimulator, GoldVsInflationAnalyzer, DividendIncomeProjector, DRIPSimulator,
} from './investasi'

// Personal Finance
import {
  WealthFreedomPlanner, EmergencyShieldBuilder, InflationGuard, BudgetArchitect,
  DebtDestroyer, NetWorthTracker, SavingsGrowthSimulator, GoalAchieverPlanner,
} from './personal-finance'

// Kredit & Properti
import {
  LoanTrueCostAnalyzer, RefinancingDecisionTool, BuyVsRentAnalyzer,
  KPRAffordabilityChecker, RentalYieldAnalyzer, PropertyInvestmentAnalyzer,
} from './kredit'

// Saham
import { AveragingStrategyBuilder, EntryPriceOptimizer, BreakEvenAnalyzer } from './saham'

// Kripto
import {
  CryptoDCASimulator, StakingRewardProjector, CryptoRiskManager,
  LiquidationPriceAnalyzer, FundingRateCostEstimator,
} from './kripto'

export const CALC_REGISTRY: Record<string, ComponentType> = {
  // Trading
  'risk-manager':                 RiskManager,
  'trade-analyzer':               TradeAnalyzer,
  'stop-loss-optimizer':          StopLossOptimizer,
  'max-loss-guardian':            MaxLossGuardian,
  'trading-performance-analyzer': TradingPerformanceAnalyzer,
  'win-rate-expectancy-tracker':  WinRateExpectancyTracker,
  'drawdown-recovery-planner':    DrawdownRecoveryPlanner,
  'pip-profit-analyzer':          PipProfitAnalyzer,
  'margin-leverage-guard':        MarginLeverageGuard,
  'swap-cost-estimator':          SwapCostEstimator,
  'kelly-criterion-optimizer':    KellyCriterionOptimizer,
  'probability-of-ruin-analyzer': ProbabilityOfRuinAnalyzer,
  'streak-analyzer':              StreakAnalyzer,
  // Pajak
  'tax-optimizer-pph21':          TaxOptimizerPPh21,
  'thr-tax-planner':              THRTaxPlanner,
  'freelancer-tax-estimator':     FreelancerTaxEstimator,
  'investment-tax-report-generator': InvestmentTaxReportGenerator,
  'zakat-tax-planner':            ZakatTaxPlanner,
  'umkm-tax-estimator':           UMKMTaxEstimator,
  'ppn-tracker':                  PPNTracker,
  // Investasi
  'dca-simulator':                DCASimulator,
  'sbn-maturity-planner':         SBNMaturityPlanner,
  'coupon-income-planner':        CouponIncomePlanner,
  'bond-yield-analyzer':          BondYieldAnalyzer,
  'gold-dca-simulator':           GoldDCASimulator,
  'gold-vs-inflation-analyzer':   GoldVsInflationAnalyzer,
  'dividend-income-projector':    DividendIncomeProjector,
  'drip-simulator':               DRIPSimulator,
  // Personal Finance
  'wealth-freedom-planner':       WealthFreedomPlanner,
  'emergency-shield-builder':     EmergencyShieldBuilder,
  'inflation-guard':              InflationGuard,
  'budget-architect':             BudgetArchitect,
  'debt-destroyer':               DebtDestroyer,
  'net-worth-tracker':            NetWorthTracker,
  'savings-growth-simulator':     SavingsGrowthSimulator,
  'goal-achiever-planner':        GoalAchieverPlanner,
  // Kredit & Properti
  'loan-true-cost-analyzer':      LoanTrueCostAnalyzer,
  'refinancing-decision-tool':    RefinancingDecisionTool,
  'buy-vs-rent-analyzer':         BuyVsRentAnalyzer,
  'kpr-affordability-checker':    KPRAffordabilityChecker,
  'rental-yield-analyzer':        RentalYieldAnalyzer,
  'property-investment-analyzer': PropertyInvestmentAnalyzer,
  // Saham
  'averaging-strategy-builder':   AveragingStrategyBuilder,
  'entry-price-optimizer':        EntryPriceOptimizer,
  'break-even-analyzer':          BreakEvenAnalyzer,
  // Kripto
  'crypto-dca-simulator':         CryptoDCASimulator,
  'staking-reward-projector':     StakingRewardProjector,
  'crypto-risk-manager':          CryptoRiskManager,
  'liquidation-price-analyzer':   LiquidationPriceAnalyzer,
  'funding-rate-cost-estimator':  FundingRateCostEstimator,
}
